# Tidefront

Tidefront is an original 3D combined-arms conquest game set around a sea shared by the fictional countries of Aster and Veyra. Each match has six capture zones, two land crossings, two airfields and marked landing beaches. Each faction has eight seats. Bots fill empty seats and can move, fight, drive ground vehicles, capture territory and respawn.

## Play solo

Open **Tidefront.html** in a current WebGL 2 browser. The standalone file includes its code, interface and assets. Select **Fight solo** to start a match with fifteen bots. The browser build also includes touch controls.

Select **Lead the battle** to open the live command map with two rifle squads, two tank crews and a mobile missile launcher ready for orders. Choose a unit, then click a clear land destination. **Hold position** stops a unit while its crew stays alert. **Resume AI** returns it to autonomous play. Press **M** or select **Return to fight** to control your character while the orders continue.

Your team earns 250 requisition points for capturing a base and 100 for defeating an enemy. Spend the team budget in **Requisition** on a rifle fireteam, tank detachment or missile detachment. These units arrive at Command and wait for orders. To spend 450 points on a three-jet Kestrel strike, select the squadron and mark the destination on the map.

Use **Select to merge**, pick any two or more friendly units, and choose **Merge selected**. A command group takes one row on the map. A move order sends its members to separate spots around the destination. Merge existing groups to combine them, or select **Split group** to restore the individual units with their current orders. Ground purchases are limited by earned points. If Command's pads are full, paid reinforcements wait in the queue until a pad clears.

The **R** on your team’s map marks a parking strip at Command with an empty recon car, tank, Lancer launcher, and Meridian ballistic launcher. Approach one and press **E** to board. While driving the Meridian, open the map with **M**, select **Mark launcher target**, and pick a point inside the range ring. Return to combat, stop, let the launcher align, and fire. You can also requisition a Meridian detachment for your AI force.

## Host online

Use Node.js 20 or newer. In the extracted project folder, run:

```sh
npm ci
npm start
```

Open **http://localhost:3000**, choose **Join online**, and choose a room code. Other players on your local network open the server computer’s LAN address on port 3000 and enter the same room code. For internet play, run the Node server on a host that supports Socket.IO connections over HTTPS. The hosted solo page can connect to an HTTPS game server if its origin is included in the server’s `CORS_ORIGINS` environment variable. Use a comma-separated list for multiple origins. Room codes group players into matches.

The project includes a built client. After editing source, run `npm run build` to regenerate the web build and standalone HTML. Run `npm test` for simulation and Socket.IO integration checks. `PORT` and `HOST` override the listening address.

In online matches the first player on each team commands its AI units. If they disconnect, command passes to a remaining teammate.

## Play

| Action | Controls |
| --- | --- |
| Move or swim | W, A, S, D |
| Aim | Mouse, drag on touch, or arrow keys |
| Sprint and jump | Shift and Space |
| AK-47, RPG, reload | 1, 2, R |
| Primary and secondary weapons | Left and right mouse button or F and X |
| Board or dismount | E |
| Drive or sail | W, A, S, D |
| Fly | W to accelerate, S to slow, Space to raise the nose, Q to lower it, A and D to turn |
| Berth and ramp | G at the helm of a landing ship |
| Camera, live command map and roster | C, M, Tab |

Capture a zone by staying within its ring. Enemy presence contests it. Hold all three opposing bases for 12 seconds to win.

Drive your vehicle up the lowered stern ramp, stop on the deck and dismount. Take the ship’s helm, secure the ramp with **G**, and sail. At the far landing beach, release the throttle, approach the marker and press **G**. Berthing assist aligns the stern and lowers the ramp. Dismount and drive your vehicle off the back. Cargo keeps its place on the deck as the ship translates and turns.

Vehicle geometry and terrain are procedural. The title screen uses generated artwork. The project bundles the Barlow Condensed font under the license in `licenses/`.

## Deploy on Render

Create a Blueprint from this GitHub repository in the Render Dashboard. The blueprint uses one Free Node web service and checks `/api/status` before routing traffic. Open the service's public HTTPS URL and choose **Join online**. Friends use the same link and room code. The browser and Socket.IO server share the same origin.

The Free service can sleep when idle. Allow it to wake before joining a room. Matches are held in memory for the lifetime of the server process.
