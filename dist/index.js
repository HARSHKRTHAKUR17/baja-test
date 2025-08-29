"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const FULL_NAME = "harsh_kumar_thakur";
const DOB = "17072003";
const EMAIL = "theharshkrthakur17@gmail.com";
const ROLL_NUMBER = "22BIT0277";
app.post("/bfhl", (req, res) => {
    try {
        const inputData = req.body.data || [];
        const evenNumbers = [];
        const oddNumbers = [];
        const alphabets = [];
        const specialChars = [];
        let sum = 0;
        inputData.forEach((item) => {
            if (/^\d+$/.test(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0)
                    evenNumbers.push(item);
                else
                    oddNumbers.push(item);
            }
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
            }
            else {
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
    }
    catch (error) {
        res.status(500).json({
            is_success: false,
            message: "An error occurred",
        });
    }
});
app.get("/bfhl", (_req, res) => {
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
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
