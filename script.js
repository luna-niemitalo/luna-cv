
if (typeof document !== 'undefined') {
    const animContainer = document.getElementById('anim-container');
    animContainer.style.display = 'inherit';

}

const svg = document.getElementById("animation");
const midpoint = 500;
const paths = [
    {
        element: document.getElementById("curve1"),
        origin: { x: 110, y: midpoint },
        angle: 0,
        frequency: -4, // Hz
        amplitude: 15 // px
    },
    {
        element: document.getElementById("curve2"),
        origin: { x: 100, y: midpoint },
        angle: -2,
        frequency: -2, // Hz
        amplitude: 15// px
    },
    {
        element: document.getElementById("curve3"),
        origin: { x: 100, y: midpoint },
        angle: 3,
        frequency: 4, // Hz
        amplitude: 15 // px
    }
];

const numPoints = 1000; // Number of curve points
const curveHeight = 1000; // Total height of the curve

function animate(time) {
    const sceneTime = time / 5000; // Convert time to seconds
    let combinedPath = "";
    paths.forEach(({ element, origin, angle, frequency, amplitude }) => {
        const points = [];
        for (let i = 0; i < numPoints; i++) {
            const t = i / (numPoints - 1);
            const y = origin.y + (t - 0.5) * curveHeight;
            const xOffset = Math.sin((y * frequency + sceneTime) * 2 * Math.PI) * amplitude;
            const rotatedX = origin.x + xOffset * Math.cos(angle * Math.PI / 180) - (y - origin.y) * Math.sin(angle * Math.PI / 180);
            const rotatedY = origin.y + xOffset * Math.sin(angle * Math.PI / 180) + (y - origin.y) * Math.cos(angle * Math.PI / 180);
            points.push(`${rotatedX},${rotatedY}`);
        }
        const pathData = `M ${points.map((p) => p).join(" L ")}`;
        element.setAttribute("d", pathData);
        combinedPath += `${pathData} L 0,1000 L 0,0 Z `;
    });

    // Update the combined clip path for the filled region
    document.getElementById("combinedCurves").setAttribute("d", combinedPath );
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);