import '../LoginPage.css'

const SLIDES = [
    {
        title: 'Welcome back to your journey of ',
        highlight: 'knowledge discovery',
        description: 'Continue your journey of discovering knowledge and new heights with LearnOva. Each lesson will be an important step towards the future'
    }
];

const LoginBanner = () => {
    return (
      <div className="loginBanner">
          <div className="loginBanner-overlay"/>
          <div className="loginBanner-content">

              <h1 className="loginBanner-title">
                {SLIDES[0].title}{''}
                  <em>{SLIDES[0].highlight}</em>
              </h1>

              <p className="loginBanner-description">
                  {SLIDES[0].description}
              </p>

          </div>
      </div>
    );
}

export default LoginBanner;