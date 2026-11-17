# OptiWallet

Credit card optimization tracker. Cards you pick from the catalog are the wallet, and the app stores that choice in this browser.

The catalog has 69 cards: Chase 18, Amex 14, Capital One 8, Citi 6, Bank of America 6, Barclays 6, Discover 4, US Bank 3, Wells Fargo 3, and Bilt 1. The issuer label is "US Bank", with no periods. A card record has an annual fee, category multipliers, a cents-per-point valuation, credits, perks, and transfer partners.

- **Overview.** Card count, total annual fees, and the average cents-per-point value. A bar chart lists cards with an annual fee, highest first. A bar's label is the card name with everything from the first ® removed, and with the words "Credit Card" removed. A card with no annual fee is left off that chart. A pie chart counts cards by issuer.
- **Strategy.** The picker opens on Dining. The percent on a card is its multiplier times its cents-per-point number. The category rate is the first matching multiplier on that card, not the highest, so an earlier `hotel` or `travel_general` rate is used even when a later `hotel_hyatt` rate is higher. The screen shows the highest percent and the next three. Dining uses a dining rate. Groceries uses `grocery` or `grocery_online`. Flights uses `travel_air`, or another travel rate whose name does not contain "portal". General Travel uses any rate whose name contains "travel", including portal rates. Gas uses `gas` or `rotating`. Amazon uses `amazon` or `grocery`. Hyatt uses a non-portal `hotel_hyatt`, `hotel`, or `travel_general` rate. Marriott uses a non-portal `hotel_marriott`, `hotel`, or `travel_general` rate. Rent uses a `rent` rate, and otherwise subtracts 3 from that percent. Online Groceries, the portal categories, Transit, Hilton, IHG, Hotels, and every remaining category use only the card's base rate.
- **My Wallet.** Each selected card is drawn with the issuer, the card name, the annual fee or "NO FEE", and the same placeholder number, •••• •••• •••• 1234. Under that are the card's credits, the base rate, the first five category rates, and the perks. A category label replaces only the first underscore, so `travel_portal_hotel` is shown as "travel portal_hotel".
- **Points.** Balances are grouped by the card's reward name and kept in this browser. The dollar estimate is the balance times that program's cents-per-point value, divided by 100. The header says the examples are 2.05¢ for Chase and Bilt and 2.0¢ for Amex. Cards that share a reward name in the catalog also share one cents-per-point value.
- **Credits.** A checklist of the selected cards' statement credits. Only the first `$` figure in the credit text is counted, so "United Club Membership ($650 value)" counts as 650. A credit with no `$` figure, such as "Two 5k Mile Rebates", counts as 0. The screen adds those amounts and the amounts whose boxes are checked. With no credits, it says "No Credits Available" and names Sapphire Reserve and Amex Platinum.
- **Add Cards.** The catalog. The first tab state is Overview. With no cards saved, an effect then switches to this catalog. After that, choosing Overview, Strategy, My Wallet, Points, or Credits, or clicking the OptiWallet logo, shows "Your wallet is empty" and a Browse Catalog button. It does not switch back by itself. Issuer sections start closed. The filter starts on Personal. Business is a card whose name contains "business", "ink", "spark", "corporate", or "biz". Search matches the card name or the issuer. No match says "No cards found".

A missing `theme` key follows the system preference, and the first load writes that choice as `dark` or `light`. After the key exists, the system preference is not read again. The other keys are `optiWallet_cards`, `optiWallet_balances`, and `optiWallet_creditUsage`. A saved value that is not JSON throws while the page is loading.

The screen code is in `src/`. `src/constants.ts` is the card catalog. `src/components/` holds Overview, Strategy, My Wallet, Points, Credits, and the catalog screen.

```bash
npm install
npm run dev
```
