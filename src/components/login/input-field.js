import React from "react";
import styles from "./login.css";

export default class InputFields extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        const { maxLength, value, name } = e.target;
        const [fieldName, fieldIndex] = name.split("-");



        let fieldIntIndex = parseInt(fieldIndex, 7);
        localStorage.setItem("num"+ fieldIntIndex, e.target.value)
        console.log("fieldIntIndex",e.target.value);
        // Check if no of char in field == maxlength
        if (value.length >= maxLength) {
            // It should not be last input field
            if (fieldIntIndex < 6) {
                // Get the next input field using it's name
                const nextfield = document.querySelector(
                    `input[name=field-${fieldIntIndex + 1}]`
                );

                // If found, focus the next field
                if (nextfield !== null) {
                    nextfield.focus();
                }
            }
        }
    }

    render() {
        return (
            <div style={{ padding: 0 }}>
                <InputFild 
                    name="field-1"
                    length="1"
                    handleChange={this.handleChange}
                />
                <InputFild
                    name="field-2"
                    length="1"
                    handleChange={this.handleChange}
                />
                <InputFild
                    name="field-3"
                    length="1"
                    handleChange={this.handleChange}
                />

                <InputFild
                    name="field-4"
                    length="1"
                    handleChange={this.handleChange}
                />
                <InputFild
                    name="field-5"
                    length="1"
                    handleChange={this.handleChange}
                />
                <InputFild
                    name="field-6"
                    length="1"
                    handleChange={this.handleChange}
                />
            </div>
        );
    }
}
class InputFild extends React.Component {
    render() {
        return (
            <input
                className={styles.c_login__otp__input_input}
                style={{ margin: 1 }}
                type="text"
                name={this.props.name}
                maxLength={this.props.length}
                onChange={this.props.handleChange}
            ></input>
        );
    }
}
// export default class InputFields extends React.Component {
//     handleChange(e){
//       const { maxLength, value, name } = e.target;
//       const [fieldName, fieldIndex] = name.split("");

//       console.log("maxLength", maxLength);

//       let fieldIntIndex = parseInt(fieldIndex, 6);

//       // Check if no of char in field == maxlength
//       if (value.length >= maxLength) {

//         // It should not be last input field
//         if (fieldIntIndex < 6) {

//           // Get the next input field using it's name
//           const nextfield = document.querySelector(
//             `input[name=field-${fieldIntIndex + 1}]`
//           );

//           // If found, focus the next field
//           if (nextfield !== null) {
//             nextfield.focus();
//           }
//         }
//       }
//     };

//     render() {
//       return (
//         <div style={{ padding: 10 }}>
//           <InputFild name="field-1" length="1"
//                      handleChange={this.handleChange} />
//           <InputFild name="field-2" length="1"
//                      handleChange={this.handleChange} />
//           <InputFild name="field-3" length="1"
//                      handleChange={this.handleChange} />
//             <InputFild name="field-4" length="1"
//             handleChange={this.handleChange} />

//             <InputFild name="field-5" length="1"
//             handleChange={this.handleChange} />
//             <InputFild name="field-6" length="1"
//             handleChange={this.handleChange} />
//         </div>
//       );
//     }
//   }
//   class InputFild extends React.Component {
//     render() {
//       return (
//         <input  className={
//             styles.c_login__otp__input_input
//         }
//           type="tel"
//           name={this.props.name}
//           maxLength={this.props.length}
//           onChange={this.props.handleChange}
//         ></input>
//       );
//     }
//   }
