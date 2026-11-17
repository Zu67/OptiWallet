# OptiWallet

Credit card optimization tracker. Cards you pick from the catalog are the wallet, and the app stores that choice in this browser.

The catalog includes Chase, Amex, Capital One, Citi, Discover, Wells Fargo, U.S. Bank, Bank of America, Barclays, and Bilt. A card record has an annual fee, category multipliers, a cents-per-point valuation, credits, perks, and transfer partners.

- **Overview.** Card count, total annual fees, average point valuation, and the mix of issuers.
- **Strategy.** The picker opens on Dining. The percent on a card is its multiplier times its cents-per-point number. The screen shows the highest and the next three. Dining uses a dining rate. Groceries uses `grocery` or `grocery_online`. Flights uses `travel_air`, or another travel rate whose name does not contain "portal". General Travel uses any rate whose name contains "travel", including portal rates. Gas uses `gas` or `rotating`. Amazon uses `amazon` or `grocery`. Hyatt uses a non-portal `hotel_hyatt`, `hotel`, or `travel_general` rate. Marriott uses a non-portal `hotel_marriott`, `hotel`, or `travel_general` rate. Rent uses a `rent` rate, and otherwise subtracts 3 from that percent. Online Groceries, the portal categories, Transit, Hilton, IHG, Hotels, and every remaining category use only the card's base rate.
- **My Wallet.** The selected cards.
- **Points.** Point balances, kept in this browser.
- **Credits.** A checklist of statement credits on the selected cards.
- **Add Cards.** The catalog. With nothing selected, the app opens here.

Dark mode follows the system theme until it is changed. The wallet, balances, credit checkoffs, and theme are stored in `localStorage`.

The screen code is in `src/`. `src/constants.ts` is the card catalog. `src/components/` holds Overview, Strategy, My Wallet, Points, Credits, and the catalog screen.

```bash
npm install
npm run dev
```
