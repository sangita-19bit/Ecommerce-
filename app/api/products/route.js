import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { products as initialProducts } from '@/app/data/products';
import { getTokenFromRequest, verifyToken } from '@/lib/auth';

export async function GET(req) {
  try {
    await connectDB();

    // Auto-seed if database is empty
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(initialProducts);
    }

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const badge = searchParams.get('badge');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');

    const filter = {};

    if (category && category !== 'All') {
      filter.category = new RegExp(`^${category}$`, 'i');
    }

    if (badge && badge !== 'All') {
      filter.badge = badge;
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      filter.price = { ...(filter.price || {}), $lte: Number(maxPrice) };
    }

    if (minRating && !isNaN(Number(minRating)) && Number(minRating) > 0) {
      filter.rating = { ...(filter.rating || {}), $gte: Number(minRating) };
    }

    if (search && search.trim()) {
      const q = search.trim();
      filter.$or = [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ];
    }

    let query = Product.find(filter);

    // Sorting
    switch (sort) {
      case 'price-asc':
        query = query.sort({ price: 1 });
        break;
      case 'price-desc':
        query = query.sort({ price: -1 });
        break;
      case 'rating':
        query = query.sort({ rating: -1 });
        break;
      case 'name':
        query = query.sort({ name: 1 });
        break;
      default:
        query = query.sort({ createdAt: -1 });
        break;
    }

    const products = await query.exec();

    return NextResponse.json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    console.error('Fetch products error:', error);
    // Fallback to initialProducts if DB error so site remains available
    return NextResponse.json({
      success: false,
      error: error.message,
      products: initialProducts,
    }, { status: 200 });
  }
}

export async function POST(req) {
  try {
    await connectDB();

    // Check auth
    const token = getTokenFromRequest(req);
    const decoded = token ? verifyToken(token) : null;
    if (!decoded) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: Please log in to create products' },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Name, price and category are required' },
        { status: 400 }
      );
    }

    // Auto-generate slug if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const product = await Product.create(body);

    return NextResponse.json(
      { success: true, product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
