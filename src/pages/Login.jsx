//import loginImg from "../assets/Images/login.webp"
import Template from "../components/core/Auth/Template"
import loginImg1 from "../assets/Images/job-portal-1.jpg"

function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Log in to find your dream job."
      description2="Jobify is the next step in your career."
      image={loginImg1}
      formType="login"
    />
  )
}

export default Login