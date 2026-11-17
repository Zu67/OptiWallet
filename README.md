# OptiWallet

Credit card optimization tracker. Cards you pick from the catalog are the wallet, and the app stores that choice in this browser.

The catalog includes Chase, Amex, Capital One, Citi, Discover, Wells Fargo, U.S. Bank, Bank of America, Barclays, and Bilt. A card record has an annual fee, category multipliers, a cents-per-point valuation, credits, perks, and transfer partners.

- **Overview.** Card count, total annual fees, and the average cents-per-point value. A bar chart lists cards with an annual fee, highest first. A pie chart counts cards by issuer.
- **Strategy.** The picker opens on Dining. The percent on a card is its multiplier times its cents-per-point number. The screen shows the highest and the next three. Dining uses a dining rate. Groceries uses `grocery` or `grocery_online`. Flights uses `travel_air`, or another travel rate whose name does not contain "portal". General Travel uses any rate whose name contains "travel", including portal rates. Gas uses `gas` or `rotating`. Amazon uses `amazon` or `grocery`. Hyatt uses a non-portal `hotel_hyatt`, `hotel`, or `travel_general` rate. Marriott uses a non-portal `hotel_marriott`, `hotel`, or `travel_general` rate. Rent uses a `rent` rate, and otherwise subtracts 3 from that percent. Online Groceries, the portal categories, Transit, Hilton, IHG, Hotels, and every remaining category use only the card's base rate.
- **My Wallet.** Each selected card is drawn with the issuer, the card name, the annual fee or "NO FEE", and the same placeholder number, •••• •••• •••• 1234. Under that are the card's credits, the base rate, the first five category rates, and the perks. A category label replaces only the first underscore, so `travel_portal_hotel` is shown as "travel portal_hotel".
- **Points.** Balances are grouped by the card's reward name and kept in this browser. The dollar estimate is the balance times that program's cents-per-point value, divided by 100. The header says the examples are 2.05¢ for Chase and Bilt and 2.0¢ for Amex. Cards that share a reward name in the catalog also share one cents-per-point value.
- **Credits.** A checklist of the selected cards' statement credits. A dollar amount is read from a `$` figure in the credit text. The screen adds those amounts and the amounts whose boxes are checked. With no credits, it says "No Credits Available" and names Sapphire Reserve and Amex Platinum.
- **Add Cards.** The catalog. With nothing selected, the app opens here. Issuer sections start closed. The filter starts on Personal. Business is a card whose name contains "business", "ink", "spark", "corporate", or "biz". Search matches the card name or the issuer. No match says "No cards found".

Dark mode follows the system theme until it is changed. The wallet, balances, credit checkoffs, and theme are stored in `localStorage`.

The screen code is in `src/`. `src/constants.ts` is the card catalog. `src/components/` holds Overview, Strategy, My Wallet, Points, Credits, and the catalog screen.

```bash
npm install
npm run dev
```
