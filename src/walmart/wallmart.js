
const projection = d3.geoAlbersUsa().scale(1280).translate([480, 300]);
const parseDate = d3.utcParse("%m/%d/%Y");

function parseSeries(series) {
    return series.map(([year, value]) => [new Date(Date.UTC(year, 0, 1)), value]);
}

d3.json("/static/10m.json").then(function (us) {
    
    us.objects.lower48 = {
        type: "GeometryCollection",
        geometries: us.objects.states.geometries.filter(d => d.id !== "02" && d.id !== "15")
    };
    
    d3.tsv("/static/walmart.tsv").then(function (wall) {
        
        const data = wall.map(d => {
            const p = projection(d);
            p.date = parseDate(d.date);
            return p;
        }).sort((a, b) => a.date - b.date);

        console.log("hello")
        
        
        const svg = d3.select("body").append("svg")
                    .attr("viewBox", [0, 0, 960, 600]);

        svg.append("path")
            .datum(topojson.merge(us, us.objects.lower48.geometries))
            .attr("fill", "#ddd")
            .attr("d", d3.geoPath());

        svg.append("path")
            .datum(topojson.mesh(us, us.objects.lower48, (a, b) => a !== b))
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", d3.geoPath());

        const g = svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "black");

        const dot = g.selectAll("circle")
            .data(data)
            .join("circle")
            .attr("transform", d => `translate(${d})`);

        svg.append("circle")
            .attr("fill", "blue")
            .attr("transform", `translate(${data[0]})`)
            .attr("r", 3);

        let previousDate = -Infinity;

        function update(date) {
            dot // enter
                .filter(d => d.date > previousDate && d.date <= date)
                .transition().attr("r", 3);
            dot // exit
                .filter(d => d.date <= previousDate && d.date > date)
                .transition().attr("r", 0);
            previousDate = date;
        }

        const scrubber = Scrubber(d3.utcWeek.every(2).range(...d3.extent(data, d => d.date)), { format: d3.utcFormat("%Y %b %-d"), loop: false });
            scrubber.addEventListener("input", () => update(scrubber.value));
            d3.select("body").append(() => scrubber);
                
    });
    
});

const html = htl.html;

function Scrubber(values, {
    format = value => value,
    initial = 0,
    delay = null,
    autoplay = true,
    loop = true,
    loopDelay = null,
    alternate = false
} = {}) {
    values = Array.from(values);
    console.log("hello")
    
    const form = html`<form style="font: 12px var(--sans-serif); font-variant-numeric: tabular-nums; display: flex; height: 33px; align-items: center;">
<button name=b type=button style="margin-right: 0.4em; width: 5em;"></button>
<label style="display: flex; align-items: center;">
<input name=i type=range min=0 max=${values.length - 1} value=${initial} step=1 style="width: 180px;">
<output name=o style="margin-left: 0.4em;"></output>
</label>
</form>`;
    console.log(form)
    let frame = null;
    let timer = null;
    let interval = null;
    let direction = 1;
    function start() {
        form.b.textContent = "Pause";
        if (delay === null) frame = requestAnimationFrame(tick);
        else interval = setInterval(tick, delay);
    }
    function stop() {
        form.b.textContent = "Play";
        if (frame !== null) cancelAnimationFrame(frame), frame = null;
        if (timer !== null) clearTimeout(timer), timer = null;
        if (interval !== null) clearInterval(interval), interval = null;
    }
    function running() {
        return frame !== null || timer !== null || interval !== null;
    }
    function tick() {
        if (form.i.valueAsNumber === (direction > 0 ? values.length - 1 : direction < 0 ? 0 : NaN)) {
            if (!loop) return stop();
            if (alternate) direction = -direction;
            if (loopDelay !== null) {
                if (frame !== null) cancelAnimationFrame(frame), frame = null;
                if (interval !== null) clearInterval(interval), interval = null;
                timer = setTimeout(() => (step(), start()), loopDelay);
                return;
            }
        }
        if (delay === null) frame = requestAnimationFrame(tick);
        step();
    }
    function step() {
        form.i.valueAsNumber = (form.i.valueAsNumber + direction + values.length) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    }
    form.i.oninput = event => {
        if (event && event.isTrusted && running()) stop();
        form.value = values[form.i.valueAsNumber];
        form.o.value = format(form.value, form.i.valueAsNumber, values);
    };
    form.b.onclick = () => {
        if (running()) return stop();
        direction = alternate && form.i.valueAsNumber === values.length - 1 ? -1 : 1;
        form.i.valueAsNumber = (form.i.valueAsNumber + direction) % values.length;
        form.i.dispatchEvent(new CustomEvent("input", { bubbles: true }));
        start();
    };
    form.i.oninput();
    if (autoplay) start();
    else stop();
    Inputs.disposal(form).then(stop);
    return form;
}