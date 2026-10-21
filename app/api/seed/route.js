import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import { products as initialProducts } from '@/app/data/products';

export async function GET(req) {
  try {
    await connectDB();

    const count = await Product.countDocuments();
    const url = new URL(req.url);
    const force = url.searchParams.get('force') === 'true';

    if (count > 0 && !force) {
      return NextResponse.json({
        success: true,
        message: `Database already seeded with ${count} products. Use ?force=true to overwrite.`,
        count,
      });
    }

    if (force) {
      await Product.deleteMany({});
    }

    // Insert initial products
    const inserted = await Product.insertMany(initialProducts);

    return NextResponse.json({
      success: true,
      message: `Successfully seeded ${inserted.length} products to MongoDB Atlas.`,
      count: inserted.length,
      products: inserted,
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to seed database' },
      { status: 500 }
    );
  }
}
