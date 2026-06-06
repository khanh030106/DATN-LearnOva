const AnalyticsProgressBar = ({ as: Component = "span", className, value }) => {
  return <Component className={className} style={{ width: `${value}%` }} />;
};

export default AnalyticsProgressBar;
