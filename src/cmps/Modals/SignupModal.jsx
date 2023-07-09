import { useNavigate } from 'react-router-dom'

export function SignupModal({ closeSignupModal }) {
  const navigate = useNavigate()

  function goToSignup() {
    navigate('/signup')
    closeSignupModal()
  }

  return (
    <section className="login-modal-backdrop">
      <div className="login-modal">
        <h1>Create a playlist</h1>
        <p>Signup to create and share playlists.</p>
        <div className="login-modla-btns">
          <button className="login-modal-cancle-btn" onClick={closeSignupModal}>
            Not now
          </button>
          <button className="login-modal-login-btn" onClick={goToSignup}>
            Sign up
          </button>
        </div>
      </div>
    </section>
  )
}
