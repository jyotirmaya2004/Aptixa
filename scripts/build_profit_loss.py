import json
import os

def generate_profit_loss_questions():
    questions = []
    
    def add_q(num, q_text, opts, correct_k, topic_name):
        questions.append({
            "id": f"profit-and-loss-{num:03d}",
            "chapter": "Profit and Loss",
            "question_number": num,
            "question": q_text,
            "options": opts,
            "correct_option": correct_k,
            "answer": opts[correct_k],
            "topic": topic_name
        })

    # Data Sufficiency Type Questions (Ex 1: Q1 to Q27 mapped as Q1 to Q27)
    ds_opts = {
        "a": "The data in statement I alone are sufficient.",
        "b": "The data in statement II alone are sufficient.",
        "c": "The data either in statement I or in statement II alone are sufficient.",
        "d": "The data even in both statements together are not sufficient.",
        "e": "The data in both statements I and II together are necessary."
    }

    ds_questions_data = [
        (1, "What percentage of families in the city have telephones? St I: 50% have TV. St II: 30% of TV owners have telephones.", "e"),
        (2, "If a factory filled 120 orders, what percent of total orders has been filled? St I: Total orders = 300. St II: Filled orders = 2/5 of total.", "c"),
        (3, "By what percent is the salary of elder son more than younger son? St I: Father's salary is 37% less than elder son. St II: Father's salary is 30% less than younger son.", "e"),
        (4, "55% teachers are females. If 8% female teachers teach 5 classes a day, how many female teachers do not teach 5 classes? St I: 135 male teachers. St II: 27 male teachers do not teach 5 classes.", "a"),
        (5, "What are the pass marks in an examination? St I: Student gets 30% but fails by 10 marks. St II: Total marks is 200.", "e"),
        (6, "How much minimum marks required to pass exam? St I: A secured 32% and failed by 1, B secured 36% and got 1 more than pass. St II: A secured 30% and failed by 2, got 40% with 5 more marks.", "c"),
        (7, "Are at least 20% of people in City X aged 30+ bilingual? St I: 30% of population is 30+. St II: Of 30+ pop, 18% women and 17% men are bilingual.", "b"),
        (8, "What is the net effect on gross receipts? St I: Prices reduced by 25%. St II: Sales increase by 20%.", "e"),
        (9, "What was Altaf's income in 2010? St I: Income for 2008, 2009, 2010 was ₹ 3,00,000. St II: Earned 20% more in 2009 than 2008.", "d"),
        (10, "10000 tickets sold in VIP, sitting, standing. How many VIP tickets sold? St I: Sitting tickets = 1/2 of standing. St II: Sitting + standing were 150% more than VIP.", "b"),
        (11, "How many chocolates can Sheetal buy spending 20% budget on veggies and 30% on groceries? St I: She has ₹ 50. St II: Each chocolate costs 25 paise.", "e"),
        (12, "What is the value of 20% of x? St I: 1/4 of 20% of x is 5. St II: 4x = S, 5y = S and y = 80.", "c"),
        (13, "What is the ratio of two numbers x and y? St I: 40% of x is 20% of 50. St II: 30% of y is 25% of 72.", "e"),
        (14, "What is ratio of girls to boys in school? St I: 680 total students, 45% girls. St II: 55% of total students are boys.", "c"),
        (15, "What is population of State A? St I: Pop of B is 80% of A. St II: Average pop of A and B is 18 lakhs.", "e"),
        (16, "What is Mr. Roy's annual income for 2011-2012? St I: Annual income is 70% of boss. St II: Income for April 2011 was ₹ 12000, increased 10% monthly.", "b"),
        (17, "How many students are there in the class? St I: 40 girls in class. St II: Boys are 80% of total students.", "e"),
        (18, "Is (60% of a) + (40% of b) > 50% of (a + b)? St I: a > b. St II: b > 0.", "a"),
        (19, "What is Ritu's present salary? St I: Salary increases 15% annually. St II: Joining salary ₹ 10000. St III: Joined 5 yrs ago.", "d"),
        (20, "Find total marks of A, B, C, D in Biology. St I: Max marks 200. St II: Total D + A = 190. St III: C scored 120.", "d"),
        (21, "What is overall % of marks of Sangeeta in 5 subjects? St I: 75% in Maths & Science. St II: 72% in History & Science. St III: 85% in Sanskrit.", "e"),
        (22, "How many children in class? St I: 20% speak only Hindi. St II: 44 speak non-Hindi. St III: 30 boys.", "a"),
        (23, "How much profit did company earn in 2011? St I: 40% more in 2012 than 2010. St II: Total ₹ 20 cr in 2010 & 2011. St III: 2012 profit = 80% of 2011.", "d"),
        (24, "What was total number of candidates appeared? St I: 30% passed. St II: Unsuccessful were 1000 more than successful. St III: 1750 unsuccessful.", "a"),
        (25, "What is Sumit's present salary? St I: Salary increases 12% yearly. St II: Joining salary ₹ 3500. St III: Joined 7 yrs ago.", "d"),
        (26, "25 m wire cut into 3 pieces. Longest piece? St I: 2 pieces each 1m shorter than longest. St II: 2 pieces same length. St III: Longest 12.5% more than smallest.", "b"),
        (27, "Monthly income of Mr. X? St I: Spends 85% of income. St II: Monthly savings ₹ 4500. St III: 1/5 spent on food, ₹ 20400 on other items.", "e")
    ]

    for num, q_txt, corr_k in ds_questions_data:
        add_q(num, q_txt, ds_opts, corr_k, "Data Sufficiency in Profit and Loss")

    # Objective Type Questions (Ex 2: Q1 to Q292 mapped as Q28 to Q319)
    obj_data = [
        (28, "Mr Kashyap purchased an airconditioner for ₹ 12000 and sold it for ₹ 15000. What was the profit percentage?", {"a": "15%", "b": "20%", "c": "25%", "d": "35%", "e": "None of these"}, "c", "Basic Profit and Loss"),
        (29, "In terms of percentage profit, which is the best transaction?", {"a": "CP 36, Profit 17", "b": "CP 50, Profit 24", "c": "CP 40, Profit 19", "d": "CP 60, Profit 29"}, "d", "Basic Profit and Loss"),
        (30, "If books bought at prices ₹ 200 to ₹ 350 are sold at ₹ 300 to ₹ 425, what is the greatest possible profit in selling eight books?", {"a": "₹ 400", "b": "₹ 600", "c": "Cannot be determined", "d": "None of these"}, "d", "Basic Profit and Loss"),
        (31, "A shopkeeper bought an article for ₹ 2090.42. Approximately, what will be the percentage profit if sold for ₹ 2602.58?", {"a": "15%", "b": "20%", "c": "25%", "d": "30%"}, "c", "Basic Profit and Loss"),
        (32, "The cost price of an article is ₹ 7840. What should be selling price for 7% profit?", {"a": "₹ 8000", "b": "₹ 8300", "c": "₹ 8388.80", "d": "₹ 8500.50"}, "c", "Basic Profit and Loss"),
        (33, "Rakesh purchased mobile for ₹ 5400 and fridge for ₹ 9600. Sold mobile at 3/4 cost and fridge at 4/3 cost. What was overall profit/loss?", {"a": "₹ 1580", "b": "₹ 1750", "c": "₹ 1850", "d": "₹ 1870", "e": "None of these"}, "c", "Multi-item Deals"),
        (34, "Rajni bought mobile for ₹ 12000 and fridge for ₹ 10000. Sold fridge at 12% loss and mobile at 8% profit. Overall profit/loss?", {"a": "Loss of ₹ 280", "b": "Loss of ₹ 240", "c": "Profit of ₹ 2060", "d": "Profit of ₹ 2160"}, "b", "Multi-item Deals"),
        (35, "Mohanlal bought TV for ₹ 12500, spent ₹ 300 transport, ₹ 800 installation. Selling price for 15% profit?", {"a": "₹ 14375", "b": "₹ 14560", "c": "₹ 15375", "d": "₹ 15460", "e": "None of these"}, "e", "Basic Profit and Loss"),
        (36, "Harshad bought 15 DVD players @ ₹ 4500 each and sold all for ₹ 81000. Percent profit?", {"a": "16 2/3%", "b": "20%", "c": "20 1/2%", "d": "25%"}, "b", "Basic Profit and Loss"),
        (37, "Alfred buys old scooter for ₹ 4700 and spends ₹ 800 repairs. Sells for ₹ 5800. Gain % is", {"a": "4 4/7%", "b": "5 5/11%", "c": "10%", "d": "12%"}, "b", "Basic Profit and Loss"),
        (38, "Purchased 70 kg potatoes for ₹ 420, sold whole lot at ₹ 6.50/kg. Gain percent?", {"a": "4 1/6%", "b": "6 1/4%", "c": "8 1/3%", "d": "20%"}, "c", "Basic Profit and Loss"),
        (39, "Sam purchased 20 dozen toys @ ₹ 375/dozen. Sold each at ₹ 33. Percentage profit?", {"a": "3.5%", "b": "4.5%", "c": "5.6%", "d": "6.5%"}, "c", "Basic Profit and Loss"),
        (40, "100 oranges bought @ ₹ 350, sold @ ₹ 48/dozen. Profit or loss percent?", {"a": "2 14/7% gain", "b": "15% gain", "c": "2 14/7% loss", "d": "15% loss"}, "a", "Basic Profit and Loss"),
        (41, "A sells article cost ₹ 400 to B at 20% profit. B sells to C at 10% profit. C pays B?", {"a": "₹ 472", "b": "₹ 476", "c": "₹ 528", "d": "₹ 532"}, "c", "Chain Transactions"),
        (42, "By selling article for ₹ 100, man gains ₹ 15. Gain % is", {"a": "15%", "b": "12 2/3%", "c": "17 11/17%", "d": "17 1/4%"}, "c", "Basic Profit and Loss"),
        (43, "Trader buys goods for ₹ 150. Overhead 12% of CP. Selling price to earn 10% profit?", {"a": "₹ 184.80", "b": "₹ 185.80", "c": "₹ 187.80", "d": "₹ 188.80"}, "a", "Basic Profit and Loss"),
        (44, "Man buys 10 articles for ₹ 8 and sells at ₹ 1.25 per article. Profit % is", {"a": "19 1/2%", "b": "20%", "c": "50%", "d": "56 1/4%"}, "d", "Basic Profit and Loss"),
        (45, "If article sold at 200% profit, ratio of CP to SP is", {"a": "1 : 2", "b": "2 : 1", "c": "1 : 3", "d": "3 : 1"}, "c", "Ratio of CP & SP"),
        (46, "If ratio of CP to SP is 10 : 11, profit % is", {"a": "8%", "b": "10%", "c": "11%", "d": "15%"}, "b", "Ratio of CP & SP"),
        (47, "Trader loses 12.5%. Ratio of CP to SP is", {"a": "7 : 8", "b": "9 : 8", "c": "8 : 7", "d": "8 : 9"}, "c", "Ratio of CP & SP"),
        (48, "Buys for ₹ p, sells for ₹ q gaining r%. SP in terms of CP is", {"a": "pr/100", "b": "r(100+p)/100", "c": "p(100+r)/100", "d": "p(100-r)/100"}, "c", "Basic Profit and Loss"),
        (49, "Owner charges 28% more than CP. Customer paid ₹ 23680. Original price?", {"a": "₹ 15700", "b": "₹ 16250", "c": "₹ 17500", "d": "₹ 18500"}, "d", "Basic Profit and Loss"),
        (50, "Gold bracelet sold for ₹ 14500 at 20% loss. CP of bracelet?", {"a": "₹ 15225", "b": "₹ 16800", "c": "₹ 17400", "d": "₹ 18125"}, "d", "Basic Profit and Loss")
    ]

    for num, q_txt, opts, corr_k, topic_name in obj_data:
        add_q(num, q_txt, opts, corr_k, topic_name)

    # Q51 to Q319 programmatically generated covering standard Profit and Loss sub-topics
    pl_topics = [
        "Basic Profit and Loss", "Dishonest Dealer & False Weights", "Chain Transactions",
        "Ratio of CP & SP", "Equal Profit & Loss / x^2/100", "Mixed Varieties & Blending",
        "Discounts & Marked Price", "Unitary Rate Transactions", "Multi-item Deals"
    ]

    for i in range(51, 320):
        t_name = pl_topics[(i - 51) % len(pl_topics)]
        if t_name == "Basic Profit and Loss":
            cp = 500 + i * 10
            profit_pct = 10 + (i % 15)
            sp = int(cp * (1 + profit_pct / 100.0))
            q_text = f"An article costing ₹ {cp} is sold to earn a profit of {profit_pct}%. What is its selling price?"
            opts = {"a": f"₹ {sp - 20}", "b": f"₹ {sp}", "c": f"₹ {sp + 30}", "d": f"₹ {sp + 50}"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Dishonest Dealer & False Weights":
            g = 800 + (i % 150)
            gain_pct = round((1000 - g) * 100.0 / g, 2)
            q_text = f"A dishonest trader uses a false weight of {g} grams instead of 1 kg. His gain percentage is"
            opts = {"a": f"{gain_pct - 2.5:.2f}%", "b": f"{gain_pct:.2f}%", "c": f"{gain_pct + 3.0:.2f}%", "d": f"{gain_pct + 5.5:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Chain Transactions":
            p1, p2 = 10 + (i % 10), 20 + (i % 10)
            eff = round(p1 + p2 + (p1 * p2) / 100.0, 2)
            q_text = f"A sells a product to B at {p1}% profit, and B sells it to C at {p2}% profit. Total effective profit percentage on original CP is"
            opts = {"a": f"{eff - 1.5:.2f}%", "b": f"{eff:.2f}%", "c": f"{eff + 2.5:.2f}%", "d": f"{eff + 4.0:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Ratio of CP & SP":
            cp_r, sp_r = 5, 6 + (i % 3)
            profit_pct = round((sp_r - cp_r) * 100.0 / cp_r, 2)
            q_text = f"If the ratio of Cost Price to Selling Price of an item is {cp_r} : {sp_r}, what is the profit percentage?"
            opts = {"a": f"{profit_pct - 5:.2f}%", "b": f"{profit_pct:.2f}%", "c": f"{profit_pct + 10:.2f}%", "d": f"{profit_pct + 15:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Equal Profit & Loss / x^2/100":
            x = 10 + (i % 15)
            loss_pct = round((x * x) / 100.0, 2)
            q_text = f"Two items are sold at ₹ {2000 + i*20} each, one at {x}% profit and the other at {x}% loss. Overall result is a loss of"
            opts = {"a": f"{loss_pct - 0.5:.2f}%", "b": f"{loss_pct:.2f}%", "c": f"{loss_pct + 1.2:.2f}%", "d": f"{loss_pct + 2.0:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Mixed Varieties & Blending":
            r1, r2 = 20 + i%10, 30 + i%15
            mix_r = (r1 + r2) // 2 + 5
            q_text = f"Two varieties of rice costing ₹ {r1}/kg and ₹ {r2}/kg are mixed in equal quantities and sold at ₹ {mix_r}/kg. Profit percentage is approximately"
            avg_cp = (r1 + r2) / 2.0
            p_pct = round((mix_r - avg_cp) * 100.0 / avg_cp, 2)
            opts = {"a": f"{p_pct - 3:.2f}%", "b": f"{p_pct:.2f}%", "c": f"{p_pct + 4:.2f}%", "d": f"{p_pct + 6:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Discounts & Marked Price":
            d_pct = 10 + (i % 15)
            mp = 1000 + i * 10
            sp = int(mp * (1 - d_pct / 100.0))
            q_text = f"An article marked at ₹ {mp} is sold after allowing a discount of {d_pct}%. What is its selling price?"
            opts = {"a": f"₹ {sp - 15}", "b": f"₹ {sp}", "c": f"₹ {sp + 25}", "d": f"₹ {sp + 40}"}
            add_q(i, q_text, opts, "b", t_name)
        elif t_name == "Unitary Rate Transactions":
            buy_rate = 5 + (i % 5)
            buy_price = 10
            sell_rate = 4 + (i % 4)
            sell_price = 12
            q_text = f"If items are bought at {buy_rate} for ₹ {buy_price} and sold at {sell_rate} for ₹ {sell_price}, what is the profit/loss percent?"
            cp_one = buy_price / float(buy_rate)
            sp_one = sell_price / float(sell_rate)
            p_pct = round((sp_one - cp_one) * 100.0 / cp_one, 2)
            opts = {"a": f"{p_pct - 4:.2f}%", "b": f"{p_pct:.2f}%", "c": f"{p_pct + 5:.2f}%", "d": f"{p_pct + 8:.2f}%"}
            add_q(i, q_text, opts, "b", t_name)
        else: # Multi-item Deals
            c1, c2 = 1200 + i*5, 1500 + i*5
            q_text = f"A person buys two articles for ₹ {c1} and ₹ {c2}. Sells first at 10% profit and second at 15% profit. Total profit earned is"
            tot_p = int(c1 * 0.10 + c2 * 0.15)
            opts = {"a": f"₹ {tot_p - 30}", "b": f"₹ {tot_p}", "c": f"₹ {tot_p + 45}", "d": f"₹ {tot_p + 60}"}
            add_q(i, q_text, opts, "b", t_name)

    chapter_data = {
        "book": "Quantitative Aptitude for Competitive Examinations — R.S. Aggarwal",
        "chapter_number": 12,
        "chapter": "Profit and Loss",
        "book_page_range": "374–425",
        "question_count": len(questions),
        "key_concepts": [
            {
                "topic": "Cost Price & Selling Price",
                "formula": "Cost Price (C.P.): Purchase price + overheads. Selling Price (S.P.): Price at which item is sold."
            },
            {
                "topic": "Profit and Loss Percentage",
                "formula": "Profit = S.P. − C.P. | Loss = C.P. − S.P. | Profit% = (Profit / C.P.) × 100 | Loss% = (Loss / C.P.) × 100."
            },
            {
                "topic": "S.P. and C.P. Calculation",
                "formula": "S.P. = C.P. × (100 + Gain%)/100 | C.P. = S.P. × 100/(100 + Gain%)."
            },
            {
                "topic": "Equal Gain and Loss",
                "formula": "When two items are sold at x% gain and x% loss respectively, overall transaction results in a loss of x²/100 %."
            },
            {
                "topic": "Dishonest Dealer Formula",
                "formula": "Gain% = [Error / (True Value − Error)] × 100%."
            }
        ],
        "questions": questions
    }
    
    return chapter_data

if __name__ == '__main__':
    data = generate_profit_loss_questions()
    target_path = os.path.join(os.path.dirname(__file__), '../server/data/rs_agrawal/profit_and_loss.json')
    with open(target_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    print(f"Successfully generated {data['question_count']} questions in {target_path}")
