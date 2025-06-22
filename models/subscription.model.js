import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      maxLength: [100, 'Subscription name can be up to 100 characters long'],
      minLength: [2, 'Subscription name must be at least 2 characters long'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
      min: [0, 'Price must be greater than 0'],
    },
    currency: {
      type: String,
      enum: ['INR', 'USD', 'EUR', 'Rubbel'],
      default: 'INR',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
    },
    category: {
      type: String,
      enum: ['sports', 'news', 'entertainment', 'lifestyle'],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => value <= new Date(),
        message: 'Start Date must be in the past',
      },
    },
    RenewDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after start date',
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

// Auto-calculate the renewal date if not entered
subscriptionSchema.pre("save", function (next) {
  if (!this.RenewDate) {
    const renewalPeriod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };
    this.RenewDate = new Date(this.startDate);
    this.RenewDate.setDate(this.RenewDate.getDate() + renewalPeriod[this.frequency]);
  }

  // Auto-update the status if renewal date has passed
  if (this.RenewDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
