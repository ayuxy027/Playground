const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.NODE_ENV === 'production' 
    ? "https://playground-9smx.onrender.com/api/auth/google/callback"
    : "http://localhost:5001/api/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ googleId: profile.id });
    
    if (existingUser) {
      // Update user info if it has changed
      existingUser.name = profile.displayName;
      existingUser.email = profile.emails[0].value;
      existingUser.picture = profile.photos[0].value;
      await existingUser.save();
      return done(null, existingUser);
    }
    
    // Create new user
    const newUser = new User({
      googleId: profile.id,
      name: profile.displayName,
      email: profile.emails[0].value,
      picture: profile.photos[0].value
    });
    
    const savedUser = await newUser.save();
    done(null, savedUser);
  } catch (error) {
    console.error('Error in Google Strategy:', error);
    done(error, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
}); 