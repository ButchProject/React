import React, { useState } from "react";
import Select, {components} from "react-select";
import "../styles/Selectbox.css";

const provinceOptions = [
  { value: "Teukbyeolsi", label: "특별시" },
  { value: "Gwangyeoksi", label: "광역시" },
  { value: "Gyeonggido", label: "경기도" },
  { value: "Gangwondo", label: "강원도" },
  { value: "Gyeongsangbukdo", label: "경상북도" },
  { value: "Gyeongsangnamdo", label: "경상남도" },
  { value: "Chungcheongbukdo", label: "충청북도" },
  { value: "Chungcheongnamdo", label: "충청남도" },
  { value: "Jeollabukdo", label: "전라북도" },
  { value: "Jeollanamdo", label: "전라남도" },
  { value: "Jeju-do", label: "제주도" },
];

const cityOptions = {
  Teukbyeolsi: [{ value: "Seoul", label: "서울특별시" }],
  Gwangyeoksi: [
    { vlaue: "Busan", label: "부산광역시" },
    { vlaue: "Daegu", label: "대구광역시" },
    { vlaue: "Daejeon", label: "대전광역시" },
    { vlaue: "Gwangju", label: "광주광역시" },
    { vlaue: "Incheon", label: "인천광역시" },
    { vlaue: "Ulsan", label: "울산광역시" },
  ],
  Gyeonggido: [
    { value: "gapyeonggun", label: "가평군" },
    { value: "goyangsi", label: "고양시" },
    { value: "gwacheonsi", label: "과천시" },
    { value: "gwangmyeongsi", label: "광명시" },
    { value: "gwangjusi", label: "광주시" },
    { value: "gurisi", label: "구리시" },
    { value: "gunposi", label: "군포시" },
    { value: "gimposi", label: "김포시" },
    { value: "namyangjusi", label: "남양주시" },
    { value: "dongducheonsi", label: "동두천시" },
    { value: "bucheonsi", label: "부천시" },
    { value: "seongnamsi", label: "성남시" },
    { value: "suwonsi", label: "수원시" },
    { value: "siheungsi", label: "시흥시" },
    { value: "ansansi", label: "안산시" },
    { value: "anseongsi", label: "안성시" },
    { value: "anyangsi", label: "안양시" },
    { value: "yangjusi", label: "양주시" },
    { value: "yangpyeonggun", label: "양평군" },
    { value: "yeojusi", label: "여주시" },
    { value: "yeoncheongun", label: "연천군" },
    { value: "osansi", label: "오산시" },
    { value: "yonginsi", label: "용인시" },
    { value: "uiwangsi", label: "의왕시" },
    { value: "uijeongbusi", label: "의정부시" },
    { value: "icheonsi", label: "이천시" },
    { value: "pajusi", label: "파주시" },
    { value: "pyeongtaeksi", label: "평택시" },
    { value: "pocheonsi", label: "포천시" },
    { value: "hanamsi", label: "하남시" },
    { value: "hwaseongsi", label: "화성시" },
  ],
};

const districtOptions = {
  suwonsi: [
    { value: "gwonseongu", label: "권선구" },
    { value: "yeongtonggu", label: "영통구" },
    { value: "jangangu", label: "장안구" },
    { value: "paldalgu", label: "팔달구" },
  ],
  yonginsi: [
    { value: "giheunggu", label: "기흥구" },
    { value: "sujigu", label: "수지구" },
    { value: "cheoingu", label: "처인구" },
  ],
};

const ValueContainer = ({ children, ...props }) => {
  let label = children;

  // Select의 값(value)을 첫번째 아이템 + '등'으로 변경
  if (Array.isArray(children)) {
    const [values, , multiValue] = children;
    if (multiValue) {
      label = `${values[0].label} 등`;
    }
  }

  return <components.ValueContainer {...props}>{label}</components.ValueContainer>;
};


const SelectBox = ({ setSelectedProvince, setSelectedCity, setSelectedDistrict }) => {
    const [selectedProvince, setLocalSelectedProvince] = useState(null);
    const [selectedCity, setLocalSelectedCity] = useState(null);
    const [selectedDistrict, setLocalSelectedDistrict] = useState(null);
  
    const handleProvinceChange = (selectedOption) => {
      setLocalSelectedProvince(selectedOption);
      setSelectedProvince(selectedOption.value); // Pass selected value to parent
      setLocalSelectedCity(null);
      setSelectedCity(null); // Clear city selection in parent
      setLocalSelectedDistrict(null);
      setSelectedDistrict(null); // Clear district selection in parent
    };
  
    const handleCityChange = (selectedOption) => {
      setLocalSelectedCity(selectedOption);
      setSelectedCity(selectedOption.value); // Pass selected value to parent
      setLocalSelectedDistrict(null);
      setSelectedDistrict(null); // Clear district selection in parent
    };
  
    const handleDistrictChange = (selectedOption) => {
      setLocalSelectedDistrict(selectedOption);
      setSelectedDistrict(selectedOption.value); // Pass selected value to parent
    };
  
   return (
     <div className="container">
       <Select
         className="province"
         value={selectedProvince}
         onChange={handleProvinceChange}
         options={provinceOptions}
         isClearable={false} 
       />
       <Select
         className="city"
         value={selectedCity}
         onChange={handleCityChange}
          options={
            selectedProvince ? cityOptions[selectedProvince.value] : []
          }
          isClearable={false} 
        />
        <Select
          className="district"
          value={selectedDistrict}
          onChange={handleDistrictChange}
          options={
            selectedCity ? districtOptions[selectedCity.value] : []
          }
          isMulti
          isClearable={false} 
        />
     </div>
   );
  };
  

export default SelectBox;