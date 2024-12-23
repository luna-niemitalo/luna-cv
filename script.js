

addEventListener('message', event => {
    const paths = event.data;

    const numPoints = 1100 / 2; // Number of curve points
    const curveHeight = 2200; // Total height of the curve

    function animate(time) {
        const sceneTime = time / 5000; // Convert time to seconds
        let combinedPath = "";
        paths.forEach(({ elementId, origin, angle, frequency, amplitude }) => {
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
            postMessage({name: elementId, value: pathData});
            combinedPath += `${pathData} L 0,2200 L 0,0 Z `;
        });

        // Update the combined clip path for the filled region
        postMessage({name: 'combinedPath', value: combinedPath});
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
});
