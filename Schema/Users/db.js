import mongoose from "mongoose";
const Schema = mongoose.Schema;
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    immutable: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  bannedStatus: {
    type: Boolean,
    default: false,
  },
  userType: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: String,
    required: false,
  },
  passwordResetExpires: {
    type: Date,
    required: false,
  },
});

userSchema.index({ email: 1, userType: 1 }, { unique: true });

userSchema.pre("save", function (next) {
  const user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.pre("updateOne", function (next) {
  const user = this;

  // generate a salt
  if (!user.password) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

// TODO Implement password reset method

userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return err;
  }
};

export const UserModel = mongoose.model("User", userSchema);
