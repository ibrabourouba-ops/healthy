import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";
import "./SignInModal.scss";

const SignInModal = ({ open, onClose, onSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) {
      return;
    }
    onSignIn();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setEmail("");
      setPassword("");
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="signin-modal__overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="signin-modal"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="signin-modal__close" onClick={onClose}>
              <AiOutlineClose />
            </button>
            <h2 className="signin-modal__title">Sign In</h2>
            <p className="signin-modal__text">
              Sign in to the site and all counters will increase by 1.
            </p>
            <form className="signin-modal__form" onSubmit={handleSubmit}>
              <label>
                Email
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                />
              </label>
              <button type="submit" className="signin-modal__btn">
                Sign In
              </button>
              {success && (
                <p className="signin-modal__success">Signed in successfully!</p>
              )}
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SignInModal;
