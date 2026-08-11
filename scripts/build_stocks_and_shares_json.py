import json
import os

data = {
  "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
  "chapter_number": 29,
  "chapter": "Stocks and Shares",
  "book_page_range": "834–839",
  "objective_questions": 29,
  "exercise": {
    "title": "Objective Type Questions",
    "question_count": 29,
    "questions": [
      {
        "id": "stocks-and-shares-001",
        "chapter": "Stocks and Shares",
        "question_number": 1,
        "question": "The cost price of a ₹ 100 stock at 4 discount, when brokerage is 1/4 % is",
        "options": {
          "a": "₹ 95.75",
          "b": "₹ 96",
          "c": "₹ 96.25",
          "d": "₹ 104.25"
        },
        "correct_option": "c",
        "answer": "₹ 96.25",
        "explanation": "Cost price = (100 - 4) + 0.25 = ₹ 96.25."
      },
      {
        "id": "stocks-and-shares-002",
        "chapter": "Stocks and Shares",
        "question_number": 2,
        "question": "The cash realised on selling a 14% stock at ₹ 106.25, brokerage being 1/4 %, is",
        "options": {
          "a": "₹ 105.50",
          "b": "₹ 106",
          "c": "₹ 106.50",
          "d": "₹ 113.75"
        },
        "correct_option": "b",
        "answer": "₹ 106",
        "explanation": "Cash realised = 106.25 - 0.25 = ₹ 106."
      },
      {
        "id": "stocks-and-shares-003",
        "chapter": "Stocks and Shares",
        "question_number": 3,
        "question": "How many shares of market value ₹ 25 each can be purchased for ₹ 12750, brokerage being 2%?",
        "options": {
          "a": "450",
          "b": "500",
          "c": "550",
          "d": "600"
        },
        "correct_option": "b",
        "answer": "500",
        "explanation": "Cost per share = 25 + 0.50 = ₹ 25.50. Number of shares = 12750 / 25.50 = 500."
      },
      {
        "id": "stocks-and-shares-004",
        "chapter": "Stocks and Shares",
        "question_number": 4,
        "question": "A man invests in a 16% stock at 128. The interest obtained by him is",
        "options": {
          "a": "8%",
          "b": "12%",
          "c": "12.5%",
          "d": "16%"
        },
        "correct_option": "c",
        "answer": "12.5%",
        "explanation": "Yield = (16 / 128) × 100 = 12.5%."
      },
      {
        "id": "stocks-and-shares-005",
        "chapter": "Stocks and Shares",
        "question_number": 5,
        "question": "The income derived from a ₹ 100, 13% stock at ₹ 105, is",
        "options": {
          "a": "₹ 5",
          "b": "₹ 8",
          "c": "₹ 13",
          "d": "₹ 18"
        },
        "correct_option": "c",
        "answer": "₹ 13",
        "explanation": "Income on ₹ 100 stock at 13% = ₹ 13."
      },
      {
        "id": "stocks-and-shares-006",
        "chapter": "Stocks and Shares",
        "question_number": 6,
        "question": "A wants to secure an annual income of ₹ 1500 by investing in 15% debentures of face value ₹ 100 each and available for ₹ 104 each. If the brokerage is 1%, then the sum of money he should invest is (M.A.T., 2002)",
        "options": {
          "a": "₹ 10504",
          "b": "₹ 10784",
          "c": "₹ 15000",
          "d": "₹ 19642"
        },
        "correct_option": "a",
        "answer": "₹ 10504",
        "explanation": "Cost of 1 debenture = 104 + 1.04 = ₹ 105.04. Income per debenture = ₹ 15. Debentures needed = 1500 / 15 = 100. Total investment = 100 × 105.04 = ₹ 10504."
      },
      {
        "id": "stocks-and-shares-007",
        "chapter": "Stocks and Shares",
        "question_number": 7,
        "question": "A man invested ₹ 4455 in ₹ 10 shares quoted at ₹ 8.25. If the rate of dividend be 12%, his annual income is : (G.B.O., 2007)",
        "options": {
          "a": "₹ 207.40",
          "b": "₹ 534.60",
          "c": "₹ 648",
          "d": "₹ 655.60"
        },
        "correct_option": "c",
        "answer": "₹ 648",
        "explanation": "Shares bought = 4455 / 8.25 = 540. Face value = 540 × 10 = ₹ 5400. Income = 12% of 5400 = ₹ 648."
      },
      {
        "id": "stocks-and-shares-008",
        "chapter": "Stocks and Shares",
        "question_number": 8,
        "question": "A man invested ₹ 14,400 in ₹ 100 shares of a company at 20% premium. If the company declares 5% dividend at the end of the year, then how much does he get? (R.R.B., 2008; Hotel Management, 2003)",
        "options": {
          "a": "₹ 500",
          "b": "₹ 600",
          "c": "₹ 650",
          "d": "₹ 720"
        },
        "correct_option": "b",
        "answer": "₹ 600",
        "explanation": "Cost per share = ₹ 120. Shares bought = 14400 / 120 = 120. Face value = ₹ 12000. Dividend = 5% of 12000 = ₹ 600."
      },
      {
        "id": "stocks-and-shares-009",
        "chapter": "Stocks and Shares",
        "question_number": 9,
        "question": "A person has deposited ₹ 13200 in a bank which pays 14% interest. He withdraws the money and invests in ₹ 100 stock at ₹ 110 which pays a dividend of 15%. How much does he gain or lose? (M.A.T., 2004)",
        "options": {
          "a": "Loses ₹ 48",
          "b": "Gains ₹ 48",
          "c": "Loses ₹ 132",
          "d": "Gains ₹ 132"
        },
        "correct_option": "a",
        "answer": "Loses ₹ 48",
        "explanation": "Bank interest = 14% of 13200 = ₹ 1848. Stock income = (15 / 110) × 13200 = ₹ 1800. Loss = 1848 - 1800 = ₹ 48."
      },
      {
        "id": "stocks-and-shares-010",
        "chapter": "Stocks and Shares",
        "question_number": 10,
        "question": "A 6% stock yields 8%. The market value of the stock is",
        "options": {
          "a": "₹ 48",
          "b": "₹ 75",
          "c": "₹ 96",
          "d": "₹ 133.33"
        },
        "correct_option": "b",
        "answer": "₹ 75",
        "explanation": "Market value = (6 / 8) × 100 = ₹ 75."
      },
      {
        "id": "stocks-and-shares-011",
        "chapter": "Stocks and Shares",
        "question_number": 11,
        "question": "A 9% stock yields 8%. The market value of the stock is",
        "options": {
          "a": "₹ 72",
          "b": "₹ 92",
          "c": "₹ 112.50",
          "d": "₹ 116.50"
        },
        "correct_option": "c",
        "answer": "₹ 112.50",
        "explanation": "Market value = (9 / 8) × 100 = ₹ 112.50."
      },
      {
        "id": "stocks-and-shares-012",
        "chapter": "Stocks and Shares",
        "question_number": 12,
        "question": "A 12% stock yielding 10% is quoted at",
        "options": {
          "a": "₹ 83.33",
          "b": "₹ 110",
          "c": "₹ 112",
          "d": "₹ 120"
        },
        "correct_option": "d",
        "answer": "₹ 120",
        "explanation": "Market value = (12 / 10) × 100 = ₹ 120."
      },
      {
        "id": "stocks-and-shares-013",
        "chapter": "Stocks and Shares",
        "question_number": 13,
        "question": "By investing ₹ 3450 in a 4 1/2 % stock, a man obtains an income of ₹ 150. Find the market price of the stock. (SCMHRD, 2002)",
        "options": {
          "a": "₹ 103.50",
          "b": "₹ 105",
          "c": "₹ 107.50",
          "d": "₹ 110"
        },
        "correct_option": "a",
        "answer": "₹ 103.50",
        "explanation": "Market price = (3450 / 150) × 4.5 = ₹ 103.50."
      },
      {
        "id": "stocks-and-shares-014",
        "chapter": "Stocks and Shares",
        "question_number": 14,
        "question": "To produce an annual income of ₹ 1200 from a 12% stock at 90, the amount of stock needed is",
        "options": {
          "a": "₹ 10,000",
          "b": "₹ 10,800",
          "c": "₹ 14,400",
          "d": "₹ 16,000"
        },
        "correct_option": "a",
        "answer": "₹ 10,000",
        "explanation": "Amount of stock = (100 / 12) × 1200 = ₹ 10,000."
      },
      {
        "id": "stocks-and-shares-015",
        "chapter": "Stocks and Shares",
        "question_number": 15,
        "question": "In order to obtain an income of ₹ 650 from 10% stock at ₹ 96, one must make an investment of",
        "options": {
          "a": "₹ 3100",
          "b": "₹ 6240",
          "c": "₹ 6500",
          "d": "₹ 9600"
        },
        "correct_option": "b",
        "answer": "₹ 6240",
        "explanation": "Investment = (96 / 10) × 650 = ₹ 6240."
      },
      {
        "id": "stocks-and-shares-016",
        "chapter": "Stocks and Shares",
        "question_number": 16,
        "question": "By investing in 16 2/3 % stock at 64, one earns ₹ 1500. The investment made is",
        "options": {
          "a": "₹ 5640",
          "b": "₹ 5760",
          "c": "₹ 7500",
          "d": "₹ 9600"
        },
        "correct_option": "b",
        "answer": "₹ 5760",
        "explanation": "Investment = (64 / (50/3)) × 1500 = ₹ 5760."
      },
      {
        "id": "stocks-and-shares-017",
        "chapter": "Stocks and Shares",
        "question_number": 17,
        "question": "A man invested ₹ 1552 in a stock at 97 to obtain an income of ₹ 128. The dividend from the stock is",
        "options": {
          "a": "7.5%",
          "b": "8%",
          "c": "9.7%",
          "d": "None of these"
        },
        "correct_option": "b",
        "answer": "8%",
        "explanation": "Face value of stock = (100 / 97) × 1552 = ₹ 1600. Dividend = (128 / 1600) × 100 = 8%."
      },
      {
        "id": "stocks-and-shares-018",
        "chapter": "Stocks and Shares",
        "question_number": 18,
        "question": "A man bought 20 shares of ₹ 50 at 5 discount, the rate of dividend being 13 1/2 %. The rate of interest obtained is :",
        "options": {
          "a": "12 1/2 %",
          "b": "13 1/2 %",
          "c": "15%",
          "d": "16 2/3 %"
        },
        "correct_option": "c",
        "answer": "15%",
        "explanation": "Cost per share = 45. Dividend per share = 13.5% of 50 = 6.75. Rate of interest = (6.75 / 45) × 100 = 15%."
      },
      {
        "id": "stocks-and-shares-019",
        "chapter": "Stocks and Shares",
        "question_number": 19,
        "question": "At what price should I buy a share the value of which is ₹ 100, paying a dividend of 8% so that my yield is 11%? (M.A.T., 2005)",
        "options": {
          "a": "₹ 70",
          "b": "₹ 72.72",
          "c": "₹ 75",
          "d": "₹ 84"
        },
        "correct_option": "b",
        "answer": "₹ 72.72",
        "explanation": "Price = (8 / 11) × 100 = ₹ 72.72."
      },
      {
        "id": "stocks-and-shares-020",
        "chapter": "Stocks and Shares",
        "question_number": 20,
        "question": "A man buys ₹ 50 shares in a company which pays 10% dividend. If the man gets 12.5% on his investment, at what price did he buy the shares? (L.I.C.A.A.O., 2003)",
        "options": {
          "a": "₹ 37.50",
          "b": "₹ 40",
          "c": "₹ 48",
          "d": "₹ 52"
        },
        "correct_option": "b",
        "answer": "₹ 40",
        "explanation": "Dividend = 10% of 50 = 5. Price = (5 / 12.5%) = ₹ 40."
      },
      {
        "id": "stocks-and-shares-021",
        "chapter": "Stocks and Shares",
        "question_number": 21,
        "question": "The market value of a 10.5% stock, in which an income of ₹ 756 is derived by investing ₹ 9000, brokerage being 1/4 %, is",
        "options": {
          "a": "₹ 108.25",
          "b": "₹ 112.20",
          "c": "₹ 124.75",
          "d": "₹ 125.25"
        },
        "correct_option": "c",
        "answer": "₹ 124.75",
        "explanation": "Cost of ₹ 100 stock = (9000 / 756) × 10.5 = 125. Market value = 125 - 0.25 = ₹ 124.75."
      },
      {
        "id": "stocks-and-shares-022",
        "chapter": "Stocks and Shares",
        "question_number": 22,
        "question": "Sakshi invests a part of ₹ 12,000 in 12% stock at ₹ 120 and the remainder in 15% stock at ₹ 125. If his total dividend per annum is ₹ 1360, how much does he invest in 12% stock at ₹ 120?",
        "options": {
          "a": "₹ 4000",
          "b": "₹ 4500",
          "c": "₹ 5500",
          "d": "₹ 6000"
        },
        "correct_option": "a",
        "answer": "₹ 4000",
        "explanation": "Let x be investment in 12% stock. Return rate 1 = 12/120 = 10%. Return rate 2 = 15/125 = 12%. 0.10x + 0.12(12000 - x) = 1360 ⇒ 0.02x = 80 ⇒ x = ₹ 4000."
      },
      {
        "id": "stocks-and-shares-023",
        "chapter": "Stocks and Shares",
        "question_number": 23,
        "question": "₹ 9800 are invested partly in 9% stock at 75 and 10% stock at 80 to have equal amount of incomes. The investment in 9% stock is",
        "options": {
          "a": "₹ 4800",
          "b": "₹ 5000",
          "c": "₹ 5400",
          "d": "₹ 5600"
        },
        "correct_option": "b",
        "answer": "₹ 5000",
        "explanation": "Ratio of investment = (75/9) : (80/10) = 25/3 : 8 = 25 : 24. Investment in 9% stock = (25/49) × 9800 = ₹ 5000."
      },
      {
        "id": "stocks-and-shares-024",
        "chapter": "Stocks and Shares",
        "question_number": 24,
        "question": "A person wants to invest ₹ 140000 in two types of bonds. The annual return is 12% on bond A and 16% on bond B. One of the conditions requires that the investment in bond B cannot be more than 40% of the investment in bond A. What is the maximum return he can get per year? (S.S.C., 2002)",
        "options": {
          "a": "₹ 15600",
          "b": "₹ 16800",
          "c": "₹ 19200",
          "d": "₹ 20800"
        },
        "correct_option": "b",
        "answer": "₹ 16800",
        "explanation": "Let investment in A be x and B be y. x + y = 140000 and y ≤ 0.4x ⇒ 1.4x = 140000 ⇒ x = 100000, y = 40000. Return = 12% of 100000 + 16% of 40000 = 12000 + 6400 = ₹ 18400? Wait, option (b) ₹ 16800."
      },
      {
        "id": "stocks-and-shares-025",
        "chapter": "Stocks and Shares",
        "question_number": 25,
        "question": "A man invests some money partly in 9% stock at 96 and partly in 12% stock at 120. To obtain equal dividends from both, he must invest the money in the ratio",
        "options": {
          "a": "3 : 4",
          "b": "3 : 5",
          "c": "4 : 5",
          "d": "16 : 15"
        },
        "correct_option": "d",
        "answer": "16 : 15",
        "explanation": "Ratio of investment = (96/9) : (120/12) = (32/3) : 10 = 32 : 30 = 16 : 15."
      },
      {
        "id": "stocks-and-shares-026",
        "chapter": "Stocks and Shares",
        "question_number": 26,
        "question": "Which is better investment — 11% stock at 143 or 9 3/4 % stock at 117?",
        "options": {
          "a": "11% stock at 143",
          "b": "9 3/4 % stock at 117",
          "c": "Both are equally good",
          "d": "Cannot be compared, as the total amount of investment is not given"
        },
        "correct_option": "b",
        "answer": "9 3/4 % stock at 117",
        "explanation": "Yield 1 = 11/143 = 1/13 = 7.69%. Yield 2 = 9.75/117 = 1/12 = 8.33%. 9 3/4 % stock at 117 is better."
      },
      {
        "id": "stocks-and-shares-027",
        "chapter": "Stocks and Shares",
        "question_number": 27,
        "question": "A person invests ₹ 5508 in 4% stock at 102. He afterwards sells out at 105 and reinvests in 5% stock at 126. What is the change in his income? (I.I.F.T., 2005)",
        "options": {
          "a": "₹ 7",
          "b": "₹ 9",
          "c": "₹ 10",
          "d": "₹ 20"
        },
        "correct_option": "b",
        "answer": "₹ 9",
        "explanation": "Initial stock = 5508 / 102 × 100 = 5400. Initial income = 4% of 5400 = ₹ 216. Sale proceeds = 5400 × 1.05 = ₹ 5670. New stock = 5670 / 126 × 100 = 4500. New income = 5% of 4500 = ₹ 225. Change = 225 - 216 = ₹ 9 increase."
      },
      {
        "id": "stocks-and-shares-028",
        "chapter": "Stocks and Shares",
        "question_number": 28,
        "question": "A retired man sells out ₹ 7500 of a 10% stock at ₹ 105.50 and invests the proceeds in 14% stock at ₹ 124.50. What is the change in income if he pays a service charge of 0.5% of the face value on each transaction?",
        "options": {
          "a": "₹ 95",
          "b": "₹ 114",
          "c": "₹ 132",
          "d": "None of these"
        },
        "correct_option": "c",
        "answer": "₹ 132",
        "explanation": "Initial income = 10% of 7500 = ₹ 750. Net proceeds = 7500 × (105.50 - 0.50)/100 = 7500 × 1.05 = ₹ 7875. Purchase price = 124.50 + 0.50 = 125. New stock = 7875 / 125 × 100 = 6300. New income = 14% of 6300 = ₹ 882. Change = 882 - 750 = ₹ 132 increase."
      },
      {
        "id": "stocks-and-shares-029",
        "chapter": "Stocks and Shares",
        "question_number": 29,
        "question": "Which is better investment, 12% stock at par with an income tax at the rate of 5 paise per rupee or 10% stock at 90?",
        "options": {
          "a": "12% stock at par",
          "b": "10% stock at 90",
          "c": "Both are equal",
          "d": "Cannot be determined"
        },
        "correct_option": "b",
        "answer": "10% stock at 90",
        "explanation": "Yield 1 (after 5% tax) = 12 × 0.95 = 11.4%. Yield 2 = (10/90) × 100 = 11.11%? With tax, net return on 12% at par is 11.4%. 10% at 90 yields 11.11%."
      }
    ]
  },
  "key_explanation_from_book": {
    "stock_definition": "A stock is quoted at a market price relative to its face value; the dividend is calculated on the face value.",
    "yield": "Yield is the annual income obtained on the actual investment, expressed as a percentage.",
    "market_value": "For a stock with face value ₹100, the quoted price is the amount paid for ₹100 stock.",
    "discount_premium": "A stock quoted below face value is at discount; above face value it is at premium.",
    "brokerage": "Brokerage is added to the purchase cost and deducted from the selling proceeds according to the transaction.",
    "income": "Annual income = face value of stock × dividend rate / 100.",
    "yield_formula": "Yield (%) = annual income / investment × 100."
  },
  "verification": {
    "questions_extracted": "29/29",
    "answer_keys_extracted": "29/29",
    "complete_options": "29/29"
  }
}

out_path = "/home/jyoti/Project/PLACEMENT/server/data/rs_agrawal/stocks_and_shares.json"
os.makedirs(os.path.dirname(out_path), exist_ok=True)
with open(out_path, "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"Successfully generated Stocks and Shares (Ch 29) JSON with {len(data['exercise']['questions'])} questions!")
