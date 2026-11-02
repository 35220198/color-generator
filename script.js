/* ===================================
   COLORFLOW
   PROFESSIONAL PALETTE GENERATOR
=================================== */

const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.getElementById("palette-container");
const undoBtn = document.getElementById("undo-btn");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toast-message");

const modeButtons = document.querySelectorAll(".mode-btn");
const currentMode = document.getElementById("current-mode");
const modeDisplay = document.getElementById("mode-display");


let palette = [];
let previousPalette = [];

let activeMode = "random";


/* ===================================
   INITIALIZE
=================================== */

function init() {

    const savedPalette =
        localStorage.getItem("colorflow-palette");

    const savedMode =
        localStorage.getItem("colorflow-mode");


    if (savedMode) {
        activeMode = savedMode;
    }


    if (savedPalette) {

        palette =
            JSON.parse(savedPalette);

    } else {

        palette =
            generatePaletteByMode(activeMode);
    }


    updateModeUI();

    renderPalette();

    updateUndoButton();
}


/* ===================================
   MODE BUTTON EVENTS
=================================== */

modeButtons.forEach((button) => {

    button.addEventListener("click", () => {

        activeMode =
            button.dataset.mode;


        localStorage.setItem(
            "colorflow-mode",
            activeMode
        );


        updateModeUI();

        generateNewPalette();
    });

});


/* ===================================
   UPDATE MODE UI
=================================== */

function updateModeUI() {

    modeButtons.forEach((button) => {

        button.classList.remove("active");

        if (
            button.dataset.mode ===
            activeMode
        ) {

            button.classList.add("active");

        }

    });


    const modeName =
        activeMode.charAt(0).toUpperCase() +
        activeMode.slice(1);


    currentMode.textContent =
        modeName;

    modeDisplay.textContent =
        modeName;
}


/* ===================================
   GENERATE BUTTON
=================================== */

generateBtn.addEventListener(
    "click",
    generateNewPalette
);


/* SPACEBAR */

document.addEventListener(
    "keydown",
    (event) => {

        const tag =
            document.activeElement.tagName;

        if (
            event.code === "Space" &&
            tag !== "INPUT" &&
            tag !== "TEXTAREA" &&
            tag !== "BUTTON"
        ) {

            event.preventDefault();

            generateNewPalette();

        }

    }
);


/* ===================================
   GENERATE PALETTE
=================================== */

function generateNewPalette() {

    previousPalette =
        JSON.parse(
            JSON.stringify(palette)
        );


    const newColors =
        generatePaletteByMode(activeMode);


    palette =
        newColors.map(
            (color, index) => {

                if (
                    palette[index] &&
                    palette[index].locked
                ) {

                    return palette[index];

                }


                return {

                    hex: color,
                    locked: false

                };

            }
        );


    savePalette();

    renderPalette();

    updateUndoButton();

}


/* ===================================
   PALETTE MODES
=================================== */

function generatePaletteByMode(mode) {

    switch (mode) {

        case "analogous":
            return generateAnalogous();

        case "complementary":
            return generateComplementary();

        case "triadic":
            return generateTriadic();

        case "monochromatic":
            return generateMonochromatic();

        case "pastel":
            return generatePastel();

        case "dark":
            return generateDark();

        default:
            return generateRandomPalette();

    }

}


/* ===================================
   RANDOM
=================================== */

function generateRandomPalette() {

    const colors = [];

    for (let i = 0; i < 5; i++) {

        colors.push(
            randomHex()
        );

    }

    return colors;
}


/* ===================================
   ANALOGOUS
=================================== */

function generateAnalogous() {

    const baseHue =
        randomNumber(0, 359);

    const colors = [];


    for (
        let i = -2;
        i <= 2;
        i++
    ) {

        const hue =
            (
                baseHue +
                i * 30 +
                360
            ) % 360;


        colors.push(

            hslToHex(
                hue,
                randomNumber(60, 85),
                randomNumber(40, 65)
            )

        );

    }

    return colors;
}


/* ===================================
   COMPLEMENTARY
=================================== */

function generateComplementary() {

    const hue =
        randomNumber(0, 359);

    const complement =
        (hue + 180) % 360;


    return [

        hslToHex(
            hue,
            75,
            45
        ),

        hslToHex(
            hue,
            60,
            65
        ),

        hslToHex(
            complement,
            75,
            45
        ),

        hslToHex(
            complement,
            60,
            65
        ),

        hslToHex(
            hue,
            40,
            85
        )

    ];

}


/* ===================================
   TRIADIC
=================================== */

function generateTriadic() {

    const hue =
        randomNumber(0, 359);


    const hue2 =
        (hue + 120) % 360;


    const hue3 =
        (hue + 240) % 360;


    return [

        hslToHex(hue, 75, 50),

        hslToHex(hue2, 70, 50),

        hslToHex(hue3, 70, 50),

        hslToHex(hue, 50, 70),

        hslToHex(hue2, 45, 75)

    ];

}


/* ===================================
   MONOCHROMATIC
=================================== */

function generateMonochromatic() {

    const hue =
        randomNumber(0, 359);

    const saturation =
        randomNumber(55, 85);


    return [

        hslToHex(hue, saturation, 20),

        hslToHex(hue, saturation, 35),

        hslToHex(hue, saturation, 50),

        hslToHex(hue, saturation, 65),

        hslToHex(hue, saturation, 80)

    ];

}


/* ===================================
   PASTEL
=================================== */

function generatePastel() {

    const baseHue =
        randomNumber(0, 359);

    const colors = [];


    for (let i = 0; i < 5; i++) {

        const hue =
            (
                baseHue +
                i * 40
            ) % 360;


        colors.push(

            hslToHex(

                hue,

                randomNumber(
                    45,
                    65
                ),

                randomNumber(
                    78,
                    90
                )

            )

        );

    }

    return colors;
}


/* ===================================
   DARK & MOODY
=================================== */

function generateDark() {

    const baseHue =
        randomNumber(0, 359);

    const colors = [];


    for (let i = 0; i < 5; i++) {

        const hue =
            (
                baseHue +
                i * 25
            ) % 360;


        colors.push(

            hslToHex(

                hue,

                randomNumber(
                    35,
                    70
                ),

                randomNumber(
                    12,
                    32
                )

            )

        );

    }

    return colors;
}


/* ===================================
   RANDOM NUMBER
=================================== */

function randomNumber(min, max) {

    return Math.floor(
        Math.random() *
        (max - min + 1)
    ) + min;

}


/* ===================================
   HSL TO HEX
=================================== */

function hslToHex(
    h,
    s,
    l
) {

    s /= 100;

    l /= 100;


    const c =
        (1 - Math.abs(
            2 * l - 1
        )) * s;


    const x =
        c *
        (
            1 -
            Math.abs(
                (
                    h / 60
                ) % 2 - 1
            )
        );


    const m =
        l - c / 2;


    let r = 0;
    let g = 0;
    let b = 0;


    if (
        h >= 0 &&
        h < 60
    ) {

        r = c;
        g = x;

    }

    else if (
        h < 120
    ) {

        r = x;
        g = c;

    }

    else if (
        h < 180
    ) {

        g = c;
        b = x;

    }

    else if (
        h < 240
    ) {

        g = x;
        b = c;

    }

    else if (
        h < 300
    ) {

        r = x;
        b = c;

    }

    else {

        r = c;
        b = x;

    }


    r =
        Math.round(
            (r + m) * 255
        )
        .toString(16)
        .padStart(2, "0");


    g =
        Math.round(
            (g + m) * 255
        )
        .toString(16)
        .padStart(2, "0");


    b =
        Math.round(
            (b + m) * 255
        )
        .toString(16)
        .padStart(2, "0");


    return (
        "#" +
        r +
        g +
        b
    ).toUpperCase();

}


/* ===================================
   RANDOM HEX
=================================== */

function randomHex() {

    return (
        "#" +
        Math.floor(
            Math.random() *
            16777215
        )
        .toString(16)
        .padStart(
            6,
            "0"
        )
    ).toUpperCase();

}


/* ===================================
   RENDER PALETTE
=================================== */

function renderPalette() {

    paletteContainer.innerHTML = "";


    palette.forEach(
        (color, index) => {

            const rgb =
                hexToRgb(
                    color.hex
                );


            const hsl =
                hexToHsl(
                    color.hex
                );


            const colorBox =
                document.createElement(
                    "article"
                );


            colorBox.className =
                "color-box";


            colorBox.innerHTML = `

                <div
                    class="color"
                    style="
                        background-color:
                        ${color.hex}
                    "
                >

                    <button
                        class="
                            lock-btn
                            ${
                                color.locked
                                    ? "locked"
                                    : ""
                            }
                        "
                    >

                        <i class="
                            fa-solid
                            ${
                                color.locked
                                    ? "fa-lock"
                                    : "fa-lock-open"
                            }
                        "></i>

                    </button>


                    <div
                        class="
                            copy-overlay
                        "
                    >

                        <i
                            class="
                                fa-regular
                                fa-copy
                            "
                        ></i>

                    </div>

                </div>


                <div
                    class="
                        color-info
                    "
                >

                    <div
                        class="
                            hex-row
                        "
                    >

                        <span
                            class="
                                hex-value
                            "
                        >

                            ${color.hex}

                        </span>


                        <button
                            class="
                                copy-btn
                            "
                        >

                            <i
                                class="
                                    fa-regular
                                    fa-copy
                                "
                            ></i>

                        </button>

                    </div>


                    <div
                        class="
                            color-values
                        "
                    >

                        <span>

                            <small>
                                RGB
                            </small>

                            ${rgb}

                        </span>


                        <span>

                            <small>
                                HSL
                            </small>

                            ${hsl}

                        </span>

                    </div>

                </div>

            `;


            /* COPY COLOR */

            const colorArea =
                colorBox.querySelector(
                    ".color"
                );


            colorArea.addEventListener(
                "click",
                (event) => {

                    if (
                        event.target.closest(
                            ".lock-btn"
                        )
                    ) {
                        return;
                    }


                    copyColor(
                        color.hex
                    );

                }
            );


            /* LOCK */

            colorBox
                .querySelector(
                    ".lock-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        palette[index].locked =
                            !palette[index]
                                .locked;


                        savePalette();

                        renderPalette();

                    }
                );


            /* COPY BUTTON */

            colorBox
                .querySelector(
                    ".copy-btn"
                )
                .addEventListener(
                    "click",
                    () => {

                        copyColor(
                            color.hex
                        );

                    }
                );


            paletteContainer.appendChild(
                colorBox
            );

        }
    );

}


/* ===================================
   COPY COLOR
=================================== */

function copyColor(color) {

    navigator.clipboard
        .writeText(color)

        .then(() => {

            showToast(
                `${color} copied!`
            );

        })

        .catch(() => {

            showToast(
                "Copy failed"
            );

        });

}


/* ===================================
   TOAST
=================================== */

let toastTimer;


function showToast(message) {

    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },

            2200
        );

}


/* ===================================
   UNDO
=================================== */

undoBtn.addEventListener(
    "click",
    () => {

        if (
            previousPalette.length === 0
        ) {
            return;
        }


        const current =
            JSON.parse(
                JSON.stringify(
                    palette
                )
            );


        palette =
            JSON.parse(
                JSON.stringify(
                    previousPalette
                )
            );


        previousPalette =
            current;


        savePalette();

        renderPalette();

        updateUndoButton();

    }
);


function updateUndoButton() {

    undoBtn.disabled =
        previousPalette.length === 0;

}


/* ===================================
   STORAGE
=================================== */

function savePalette() {

    localStorage.setItem(

        "colorflow-palette",

        JSON.stringify(
            palette
        )

    );

}


/* ===================================
   HEX TO RGB
=================================== */

function hexToRgb(hex) {

    const value =
        parseInt(
            hex.replace("#", ""),
            16
        );


    const r =
        (value >> 16) &
        255;


    const g =
        (value >> 8) &
        255;


    const b =
        value &
        255;


    return `${r}, ${g}, ${b}`;

}


/* ===================================
   HEX TO HSL
=================================== */

function hexToHsl(hex) {

    let r =
        parseInt(
            hex.slice(1, 3),
            16
        ) / 255;


    let g =
        parseInt(
            hex.slice(3, 5),
            16
        ) / 255;


    let b =
        parseInt(
            hex.slice(5, 7),
            16
        ) / 255;


    const max =
        Math.max(
            r,
            g,
            b
        );


    const min =
        Math.min(
            r,
            g,
            b
        );


    let h = 0;
    let s = 0;


    const l =
        (max + min) / 2;


    if (max !== min) {

        const d =
            max - min;


        s =
            l > 0.5
                ? d /
                  (
                    2 -
                    max -
                    min
                  )
                : d /
                  (
                    max +
                    min
                  );


        switch (max) {

            case r:

                h =
                    (g - b) / d +
                    (
                        g < b
                            ? 6
                            : 0
                    );

                break;


            case g:

                h =
                    (b - r) / d +
                    2;

                break;


            case b:

                h =
                    (r - g) / d +
                    4;

                break;

        }


        h /= 6;

    }


    return `

        ${Math.round(
            h * 360
        )}°,

        ${Math.round(
            s * 100
        )}%,

        ${Math.round(
            l * 100
        )}%

    `.replace(
        /\s+/g,
        " "
    ).trim();

}


/* ===================================
   START
=================================== */

init();
