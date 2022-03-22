import React, { useEffect, useRef, useState } from "react";
import "./form.css";

interface Props {
  setData: (datarow: { [key: string]: any }) => void;
}

export const Form: React.FC<Props> = ({ setData }) => {
  // input fields
  const [rangeValue, setRangeValue] = useState(10);
  const [species, setSpecies] = useState("");
  const [stems, setStems] = useState("");
  const [height, setHeight] = useState("");
  const [location, setLocation] =
    useState<{ longitude: number; lattitude: number }>();

  const maxInput = 150;
  const minInput = 0;

  const ref = useRef<HTMLInputElement>(null);
  const [sliderPosition, setSliderPosition] = useState(0);
  const handleChange = ({ target: { value } }: any) => {
    const newValue = +value;

    const position =
      10 +
      ((newValue - minInput) / (maxInput - minInput)) *
        ((ref.current ? ref.current.offsetWidth : 0) - 20);
    setSliderPosition(position);
    setRangeValue(newValue);
  };

  useEffect(() => {
    getLocation();
    handleChange({ target: { value: rangeValue } });
  }, []);
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        longitude: position.coords.longitude,
        lattitude: position.coords.latitude,
      });
    });
  };

  const submit = (e: any) => {
    e.preventDefault();
    getLocation();
    const result = {
      species,
      height,
      "Number of Stems": stems,
      DBH: rangeValue,
      date: Date(),
      location,
    };

    setData(result);

    setSpecies("");
    setStems("");
    setHeight("");
  };

  return (
    <form onSubmit={submit}>
      <h2>Enter tree data</h2>
      <div className="input-group">
        <label htmlFor="Species">Species</label>
        <input
          type="text"
          name="Species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          id="Species"
          placeholder="Species"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="diameter">Diameter at Breast Height (cm)</label>
        <div className="range-wrap">
          <div className="range-value" style={{ left: sliderPosition }}>
            {rangeValue}
          </div>
          <input
            id="diameter"
            type="range"
            min={minInput}
            max={maxInput}
            value={rangeValue}
            ref={ref}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      <div className="input-group">
        <label htmlFor="Height">Height (m)</label>
        <input
          type="number"
          name="Height"
          id="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          placeholder="Height"
          required
        />
      </div>
      <div className="input-group">
        <label htmlFor="stems">Number of stems</label>
        <input
          type="number"
          name="stems"
          value={stems}
          onChange={(e) => setStems(e.target.value)}
          id="stems"
          placeholder="stems"
          required
        />
      </div>
      <div className="input-group">
        <label>Location</label>
        <p>
          Location is saved automatically based on your current location when
          you submit
        </p>
      </div>
      <div className="input-group">
        <label>Date</label>
        <p>Date is saved automatically.</p>
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};
