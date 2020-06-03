import React, { useState, useEffect } from "react";

const Checkmark = ({ selected }) => (
    <div
        style={
            selected
                ? { left: "4px", top: "4px", position: "absolute", zIndex: "1" }
                : { display: "none" }
        }
    >
        <svg
            style={{ fill: "white", position: "absolute" }}
            width="24px"
            height="24px"
        >
            <circle cx="12.5" cy="12.2" r="8.292" />
        </svg>
        <svg
            style={{ fill: "#06befa", position: "absolute" }}
            width="24px"
            height="24px"
        >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
    </div>
);

const imgStyle = {
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const selectedImgStyle = {
    transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};
const cont = {
    backgroundColor: "#eee",
    cursor: "pointer",
    overflow: "hidden",
    position: "relative"
};

const SelectedImage = (props) => {
    const [isSelected, setIsSelected] = useState(false);
    //calculate x,y scale
    const sx = (100 - (30 / props.photo.width) * 100) / 100;
    const sy = (100 - (30 / props.photo.height) * 100) / 100;
    selectedImgStyle.transform = `translateZ(0px) scale3d(${sx}, ${sy}, 1)`;

    if (props.direction === "column") {
        cont.position = "absolute";
        cont.left = props.left;
        cont.top = props.top;
    }

    const handleOnClick = e => {
        // e.preventDefault()
        // props.mangeItem(!isSelected, props.photo)
        // console.log("props.deleteList: ", props.deleteList);

        // let temp = props.deleteList
        // if (!isSelected) {
        //     if (!temp.includes(props.photo.src)) {
        //         temp.push(props.photo.src)
        //     }

        // } else {
        //     // let temp = [...deleteArr]
        //     temp = temp.filter(t => t !== props.photo.src)
        //     // temp = temp.filter(t => {
        //     //     if (t !== props.photo.src) {
        //     //         console.log("t123");
        //     //         return t
        //     //     }
        //     // })
        //     console.log("yyyyyyyyyy", temp);

        //     // setDeleteArr(temp)
        // }
        setIsSelected(!isSelected);
        props.mangeItem(!isSelected, props.photo)
        // props.setDeleteList(temp)
    };

    useEffect(() => {
        setIsSelected(props.selected);
    }, [props.selected]);
    // console.log('deleteArr', props.)
    return (
        <div
            style={{ margin: props.margin, height: props.photo.height, width: props.photo.width, ...cont }}
            className={!isSelected ? "not-selected" : ""}
        >
            <Checkmark selected={isSelected ? true : false} />
            <img
                alt={props.photo.title}
                style={
                    isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
                }
                {...props.photo}
                onClick={handleOnClick}
            />
            <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
        </div>
    );
};

export default SelectedImage;