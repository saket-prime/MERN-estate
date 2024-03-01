import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw024bKiW2_tH2mCFbDwoMky&ust=1709347406357000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCNil57qF0oQDFQAAAAAdAAAAABAE"
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
