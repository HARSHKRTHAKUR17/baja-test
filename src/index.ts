
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const FULL_NAME = "harsh_kumar_thakur";  
const DOB = "17072003";        
const EMAIL = "theharshkrthakur17@gmail.com";  
const ROLL_NUMBER = "22BIT0277"; 

app.post("/bfhl", (req: Request, res: Response) => {
  try {
    const inputData: string[] = req.body.data || [];

    const evenNumbers: string[] = [];
    const oddNumbers: string[] = [];
    const alphabets: string[] = [];
    const specialChars: string[] = [];
    let sum = 0;

    inputData.forEach((item) => {
      if (/^\d+$/.test(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) evenNumbers.push(item);
        else oddNumbers.push(item);
      } else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
      } else {
        specialChars.push(item);
      }
    });

    
    const concatString = inputData
      .filter((item) => /^[a-zA-Z]+$/.test(item))
      .join("")
      .split("")
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    res.status(200).json({
      is_success: true,
      user_id: `${FULL_NAME}_${DOB}`,
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialChars,
      sum: sum.toString(),
      concat_string: concatString,
    });
  } catch (error) {
    res.status(500).json({
      is_success: false,
      message: "An error occurred",
    });
  }
});

app.get("/bfhl", (_req: Request, res: Response) => {
  res.status(200).json({
    operation_code: 1,   
    description: "BFHL API is up and running",
    available_routes: {
      get: "/bfhl",
      post: "/bfhl"
    }
  });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
