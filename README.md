# OptiWallet

Credit card optimization tracker. Cards you pick from the catalog are the wallet, and the app stores that choice in this browser.

The catalog includes Chase, Amex, Capital One, Citi, Discover, Wells Fargo, U.S. Bank, Bank of America, Barclays, and Bilt. A card record has an annual fee, category multipliers, a cents-per-point valuation, credits, perks, and transfer partners.

- **Overview.** Card count, total annual fees, average point valuation, and the mix of issuers.
- **Strategy.** Which selected card pays the most for a spending category. Rent without a rent multiplier is treated as a 3% fee. Hotel categories prefer a direct rate over a travel-portal rate.
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
