const registerStudent = async(req, res) =>{
    try{
      const { name, email, password, institute, qualification, major, rollNumber, gender, dob } = req.body;
      const newUser = new User({ name, email, password, institute, qualification, major, rollNumber, gender, dob });
  
      await newUser.save();
      res.status(201).json({message: "Student created successfully!"});
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
}

module.exports = {registerStudent};