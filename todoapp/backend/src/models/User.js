import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'El nombre de usuario es obligatorio'],
    unique: true
  },
  email: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  }
}, {
  timestamps: true // Crea automáticamente createdAt y updatedAt
});

const User = mongoose.model('User', userSchema);
export default User;