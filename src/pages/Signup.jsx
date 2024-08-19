//import signupImg from "../assets/Images/signup.webp"
import Template from "../components/core/Auth/Template"
import signUpImg from "../assets/Images/job-portal-2.jpg"

function Signup() {
  return (
    <Template
      title="Join our community and open doors to your next great career move."
      description1="Register now to discover jobs tailored to your skills and ambitions."
      description2="Jobify is the next step in your career."
      image={signUpImg}
      formType="signup"
    />
  )
}

export default Signup