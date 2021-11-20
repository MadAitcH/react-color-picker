import { ChangeEvent, FC, useState, useEffect } from "react";
import { Button } from "@mui/material";
import { ChromePicker, ColorResult } from "react-color";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { NewColor } from "../../utils/seedColors";

interface ColorPickerFormProps {
  isPaletteFull: boolean;
  colors: NewColor[];
  addNewColor: (newColor: NewColor) => void;
}

const ColorPickerForm: FC<ColorPickerFormProps> = ({
  isPaletteFull,
  colors,
  addNewColor,
}) => {
  const [currentColor, setCurrentColor] = useState("teal");
  const [newColorName, setNewColorName] = useState("");

  useEffect(() => {
    ValidatorForm.addValidationRule("isColorUnique", () =>
      colors.every(color => color.color !== currentColor)
    );

    ValidatorForm.addValidationRule("isColorNameUnique", value =>
      colors.every(color => color.name.toLowerCase() !== value.toLowerCase())
    );
  }, [colors, currentColor]);

  const updateCurrentColor = (newColor: ColorResult) => {
    setCurrentColor(newColor.hex);
  };

  const onTextValidatorChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "newColorName":
        setNewColorName(e.target.value);
        break;
      default:
        return;
    }
  };

  const onColorSubmit = () => {
    const newColor = {
      name: newColorName,
      color: currentColor,
    };

    addNewColor(newColor);
    setNewColorName("");
  };

  return (
    <div>
      {/* TODO: fix alpha slider or disable it */}
      <ChromePicker
        color={currentColor}
        onChangeComplete={updateCurrentColor}
      />
      <ValidatorForm onSubmit={onColorSubmit}>
        <TextValidator
          value={newColorName}
          name="newColorName"
          label="Color Name"
          onChange={onTextValidatorChange}
          disabled={isPaletteFull}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "Enter a color name",
            "Color name must be unique",
            "Color already exist",
          ]}
        />

        <Button
          variant="contained"
          color="primary"
          style={{
            backgroundColor: isPaletteFull ? "grey" : currentColor,
          }}
          type="submit"
          disabled={isPaletteFull}
        >
          {isPaletteFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;