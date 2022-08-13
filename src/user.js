const User = ({
  name,
  last_name,
  city_name,
  country_name,
  interests,
  image,
}) => {
  return (
    <>
      <div className="wholeuser">
        <img
          src={require(`./images/${image}`)}
          alt={name}
          className="img"
        ></img>

        <div className="text">
          <h2>
            {name} {last_name}
          </h2>
          <h3>
            {city_name}, {country_name}
          </h3>
          {interests.map((interest) => {
            return (
              <p className="interest" key={interest}>
                {interest}
              </p>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default User;
