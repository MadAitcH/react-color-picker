import { Component, MouseEvent } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { withStyles, WithStyles } from "@mui/styles";
import chroma from "chroma-js";
import { Link } from "react-router-dom";

const styles: { [key: string]: any } = {
  ColorBox: {
    width: "20%",
    height: (props: ColorBoxProps) => (props.showFullPalette ? "25%" : "50%"),
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover button": {
      opacity: 1,
    },
  },
  copyText: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65 ? "black" : "white",
  },
  colorName: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() <= 0.08 ? "white" : "black",
  },

  seeMore: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    position: "absolute",
    bottom: "0",
    right: "0",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
  },
  copyButton: {
    color: (props: ColorBoxProps) =>
      chroma(props.background).luminance() >= 0.65
        ? "rgba(0, 0, 0, 0.6)"
        : "white",
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    border: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    textTransform: "uppercase",
    textDecoration: "none",
    opacity: 0,
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0",
    bottom: "0",
    padding: "10px",
    color: "black",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
  },
  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.6s ease-in-out",
    transform: "scale(0.1)",
  },
  showOverlay: {
    opacity: "1",
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute",
  },
  copyMessage: {
    position: "fixed",
    left: "0",
    top: "0",
    right: "0",
    bottom: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    color: "white",
    "& h1": {
      fontWeight: "400",
      textShadow: "1px 2px black",
      background: "rgba(255, 255, 255, 0.2)",
      width: "100%",
      textAlign: "center",
      marginBottom: "0",
      padding: "1rem",
      textTransform: "uppercase",
    },
    "& p": {
      fontSize: "2rem",
      fontWeight: "100",
    },
  },
  showMessage: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "10",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.3s",
  },
};

interface ColorBoxProps extends WithStyles<typeof styles> {
  background: string;
  name: string;
  moreUrl?: string;
  showFullPalette?: boolean;
}

interface ColorBoxState {
  copied: boolean;
}

class ColorBox extends Component<ColorBoxProps, ColorBoxState> {
  constructor(props: ColorBoxProps) {
    super(props);

    this.state = {
      copied: false,
    };

    this.onCopyToClipboard = this.onCopyToClipboard.bind(this);
  }

  onCopyToClipboard() {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false });
      }, 1500);
    });
  }

  render() {
    const { classes, name, background, moreUrl, showFullPalette } = this.props;
    const { copied } = this.state;

    return (
      <CopyToClipboard text={background} onCopy={this.onCopyToClipboard}>
        <div className={classes.ColorBox} style={{ background }}>
          <div
            className={`${classes.copyOverlay} ${
              copied ? classes.showOverlay : ""
            }`}
            style={{ background }}
          />
          <div
            className={`${classes.copyMessage} ${
              copied ? classes.showMessage : ""
            }`}
          >
            <h1>copied!</h1>
            <p className={classes.copyText}>{background}</p>
          </div>
          <div>
            <div className={classes.boxContent}>
              <span className={classes.colorName}>{name}</span>
            </div>
            <button className={classes.copyButton}>Copy</button>
          </div>
          {showFullPalette && moreUrl && (
            <Link to={moreUrl} onClick={(e: MouseEvent) => e.stopPropagation()}>
              <span className={classes.seeMore}>More</span>
            </Link>
          )}
        </div>
      </CopyToClipboard>
    );
  }
}

export default withStyles(styles)(ColorBox);
