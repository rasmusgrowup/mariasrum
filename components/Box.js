import scss from "../styles/blokke.module.scss";
import React from "react";

export default function Box({ section }) {
    return (
        <section className={scss.sectionBox} style={{
            ...(!section.paddingTop && {
                paddingTop: "2rem",
            }),
            ...(!section.paddingBottom && {
                paddingBottom: "2rem",
            }),
            ...(section.backgroundColor.hex && {
                backgroundColor: section.backgroundColor.hex,
            }),
        }}>
            { section.text && section.text.map((text, i) => (
                <div key={i} className={scss.box} style={section.boxColor && { backgroundColor: section.boxColor.hex}}>
                    <div key={i} className={scss.boxText} dangerouslySetInnerHTML={{ __html: text.html }}></div>
                </div>
            ))}
        </section>
    )
}