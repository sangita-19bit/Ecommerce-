import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
      index: true,
    },
    categorySlug: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      default: null,
    },
    rating: {
      type: Number,
      default: 4.8,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Image path is required'],
    },
    badge: {
      type: String,
      default: null,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    volume: {
      type: String,
      default: '',
    },
    shelfLife: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    shortDescription: {
      type: String,
      default: '',
    },
    benefits: {
      type: [String],
      default: [],
    },
    ingredients: {
      type: String,
      default: '',
    },
    usage: {
      type: String,
      default: '',
    },
    skinType: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for 'id' matching slug or string _id to maintain compatibility
ProductSchema.virtual('id').get(function () {
  return this.slug || this._id.toHexString();
});

ProductSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret.slug || ret._id;
    return ret;
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
