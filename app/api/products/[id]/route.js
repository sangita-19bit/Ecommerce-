import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { products as initialProducts } from '@/app/data/products';

export async function GET(req, { params }) {
  try {
    const { id } = await params;
    await connectDB();

    let product = null;

    // Search by slug first
    product = await Product.findOne({ slug: id });

    // If not found and valid ObjectId, search by _id
    if (!product && mongoose.Types.ObjectId.isValid(id)) {
      product = await Product.findById(id);
    }

    // Fallback search in initialProducts if not in DB yet
    if (!product) {
      product = initialProducts.find((p) => p.slug === id || p.id === id);
    }

    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Find related products
    const related = await Product.find({
      category: product.category,
      slug: { $ne: product.slug },
    }).limit(3);

    return NextResponse.json({
      success: true,
      product,
      related,
    });
  } catch (error) {
    console.error('Fetch single product error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
