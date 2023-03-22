export const sayHello = (req, res) => {
  //res.status(200).json("Welcone to ArtGram")
  res.send(`
    <h1>Login</h1>
    <form method='post' action='/login'>
    <input type='email' name='email' placeholder='Email' required />
    <input type='password' name='password' placeholder='password' required/>
    <input type='submit' />
    </form>
    <a href='/login'>Login</a>
    `);
};

export const register = (req, res) => {
  res.send(`<h1>Register</h1>
    <form method='post' action='/signup'>
    <input type='name' name='name' placeholder='Enter your name' required />
    <input type='email' name='email' placeholder='Email' required />
    <input type='password' name='password' placeholder='password' required/>
    <input type='submit' />
    </form>
    <a href='/login'>Login</a>
  `);
};
