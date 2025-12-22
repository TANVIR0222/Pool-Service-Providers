// import {
//   IconsBlackCancel,
//   IconsButtomArrow,
//   IconsCleaning,
//   IconsFilter,
//   IconsInspection,
//   IconsLighting,
//   IconsPool,
//   IconsRepairs,
//   Iconsstap1,
//   Iconsstap2,
//   Iconsstap3,
//   Iconsstap4,
// } from "@/assets/icons";
// import tw from "@/src/lib/tailwind";
// import React, { useState } from "react";
// import {
//   Modal,
//   ScrollView,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SvgXml } from "react-native-svg";
// import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper";
// import Wrapper from "../Wrapper";
// import SetDate from "./SetDate";
// import UploadImages from "./UploadImage";

// type QuoteCategoryItem = {
//   icon: string;
//   label: string;
// };

// const propertyOptions = [
//   "Single family home",
//   "Commercial Property",
//   "Apartment",
// ];

// const categories: QuoteCategoryItem[] = [
//   { icon: IconsCleaning, label: "Pool Cleaning" },
//   { icon: IconsRepairs, label: "Repairs & Equipment" },
//   { icon: IconsPool, label: "Pool Construction" },
//   { icon: IconsFilter, label: "Filter & Pump Issue" },
//   { icon: IconsInspection, label: "Pool Inspection" },
//   { icon: IconsLighting, label: "Lighting & Automation" },
// ];

// type Props = {
//   visible: boolean;
//   onClose: () => void;
// };

// const GetQuotesModal = ({ visible, onClose }: Props) => {
//   const [step, setStep] = useState(1);
//   const [showCategories, setShowCategories] = useState<boolean>(false); //  toggle state
//   const [selected, setSelected] = useState<QuoteCategoryItem | null>(null);
//   const [propertyType, setPropertyType] = useState<string>("");

//   const handleNext = () => {
//     if (step < 4) setStep(step + 1);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const renderStepContent = () => {
//     switch (step) {
//       case 1:
//         return (
//           <>
//             <View style={tw` items-center my-8`}>
//               <SvgXml xml={Iconsstap1} width={380} />
//             </View>
//             <Text style={tw`text-base font-roboto-600 text-title_color`}>
//               What service do you need?
//             </Text>
//             <TouchableOpacity
//               onPress={() => setShowCategories((prev) => !prev)}
//               style={tw`bg-[#ECF1F6] p-3 rounded-lg flex-row items-center justify-between gap-2`}
//             >
//               <Text style={tw`text-base text-title_color`}>
//                 {selected?.label || "Select service"}
//               </Text>
//               <SvgXml xml={IconsButtomArrow} width={32} height={32} />
//             </TouchableOpacity>

//             {/*  */}
//             {/* Conditionally Show Categories */}
//             {showCategories && (
//               <View
//                 style={tw`flex-col gap-2 bg-input_bg_gray p-3 rounded-lg mt-2`}
//               >
//                 {categories.map((item, index) => (
//                   <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                       setSelected(item);
//                       setShowCategories(false); // hide after selection
//                     }}
//                     style={[
//                       tw`p-2 rounded-lg flex-row items-center gap-2`,
//                       selected?.label === item.label && tw``,
//                     ]}
//                   >
//                     <SvgXml xml={item.icon} width={28} height={28} />
//                     <Text style={tw`text-title_color text-base`}>
//                       {item.label}
//                     </Text>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             )}

//             <Text
//               style={tw` text-title_color text-base font-roboto-500 mt-4 mb-2`}
//             >
//               Describe the issue{" "}
//               <Text style={tw`text-red-500 mt-4 mb-2`}>*</Text>
//             </Text>
//             <TextInput
//               style={tw`h-28 flex-1 p-3 bg-[#ECF1F6] rounded-lg text-base`}
//               multiline
//               placeholder="My pool pump is leaking & not work correctly...."
//               placeholderTextColor="#454545"
//               selectionColor={"#454545"}
//               // textAlign=""
//               textAlignVertical="top"
//             />
//           </>
//         );

//       case 2:
//         return (
//           <>
//             <View style={tw` items-center my-8`}>
//               <SvgXml xml={Iconsstap2} width={380} />
//             </View>

//             <Text style={tw`text-base font-roboto-600 mb-2`}>Add ZIP code</Text>
//             <TextInput
//               placeholder="Write your zip code"
//               style={tw`bg-[#ECF1F6] p-3 rounded-lg mb-4`}
//               keyboardType={"numeric"}
//             />

//             {/* Property Type (Radio Buttons) */}
//             <View style={tw` flex-col gap-2`}>
//               <Text style={tw`text-base text-title_color font-roboto-500 `}>
//                 Property type.
//               </Text>
//               {propertyOptions.map((type) => {
//                 const isSelected = propertyType === type;
//                 return (
//                   <TouchableOpacity
//                     key={type}
//                     onPress={() => setPropertyType(type)}
//                     style={tw`flex-row items-center `}
//                   >
//                     <View
//                       style={tw`w-4 h-4 rounded-full border-[1px] border-sub_title_color mr-2 items-center justify-center`}
//                     >
//                       {isSelected && (
//                         <View style={tw`w-2 h-2 rounded-full bg-blue-600`} />
//                       )}
//                     </View>
//                     <Text style={tw`text-base text-sub_title_color `}>
//                       {type}
//                     </Text>
//                   </TouchableOpacity>
//                 );
//               })}
//             </View>
//           </>
//         );

//       case 3:
//         return (
//           <>
//             <View style={tw` items-center my-8`}>
//               <SvgXml xml={Iconsstap3} width={380} />
//             </View>

//             <Text style={tw`text-base font-roboto-600 mb-2`}>
//               Service address
//             </Text>
//             <TextInput
//               placeholder="Enter your address"
//               style={tw` bg-[#ECF1F6] p-3 rounded-lg mb-4`}
//             />
//             {/* Date Picker */}
//             <View style={tw` flex-col gap-2`}>
//               <Text style={tw`text-base text-title_color font-roboto-500  `}>
//                 When do you need the service?
//               </Text>
//               <SetDate />
//             </View>
//           </>
//         );

//       case 4:
//         return (
//           <>
//             <View style={tw` items-center my-8`}>
//               <SvgXml xml={Iconsstap4} width={380} />
//             </View>

//             <Text style={tw`text-base font-roboto-600 mb-2`}>
//               What’s your expected budget?
//             </Text>
//             <TextInput
//               placeholder="e.g. $554.00"
//               keyboardType="numeric"
//               style={tw`border border-gray-300 p-3 rounded-lg mb-4`}
//             />
//             <Text
//               style={tw`text-title_color text-base font-roboto-500 mt-4 mb-2`}
//             >
//               Upload videos or photos of the issue{" "}
//               <Text style={tw`text-red-500 mb-2`}>*</Text>
//             </Text>
//             <UploadImages />
//           </>
//         );
//     }
//   };

//   return (
//     <Wrapper>
//       <Modal visible={visible} transparent animationType="fade">
//         <KeyboardAvoidingWrapper>
//           <View style={tw`flex-1 items-center justify-end bg-[#00000033]`}>
//             <View style={tw`bg-white rounded-t-2xl  p-[5%] h-[60%]`}>
//               {/* Header */}
//               <View style={tw`flex-row justify-between items-center `}>
//                 <Text style={tw`text-2xl text-title_color font-roboto-600`}>
//                   Get Quotes
//                 </Text>
//                 <TouchableOpacity onPress={onClose}>
//                   {/* <Text style={tw`text-xl tex`}>✕</Text> */}
//                   <SvgXml xml={IconsBlackCancel} />
//                 </TouchableOpacity>
//               </View>

//               {/* Progress Indicator */}
//               {/* {renderStepIndicators()} */}

//               {/* Form Content */}
//               <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 style={tw`flex-1`}
//               >
//                 {renderStepContent()}
//               </ScrollView>

//               {/* Navigation Buttons */}
//               <View style={tw`flex-row justify-between mt-6`}>
//                 {/* Left Button */}
//                 {step === 1 ? (
//                   <TouchableOpacity
//                     onPress={onClose}
//                     style={tw`flex-1 py-3 mr-2 border border-gray-400 rounded-full items-center`}
//                   >
//                     <Text
//                       style={tw` text-base font-roboto-500 text-secondary_button_color`}
//                     >
//                       Cancel
//                     </Text>
//                   </TouchableOpacity>
//                 ) : (
//                   <TouchableOpacity
//                     onPress={handleBack}
//                     style={tw`flex-1 py-3 mr-2 border border-gray-400 rounded-full items-center`}
//                   >
//                     <Text
//                       style={tw` text-base font-roboto-500 text-secondary_button_color`}
//                     >
//                       Previous
//                     </Text>
//                   </TouchableOpacity>
//                 )}

//                 {/* Right Button */}
//                 <TouchableOpacity
//                   onPress={step === 4 ? onClose : handleNext}
//                   style={tw`flex-1 py-3 ml-2 bg-[#003B73] rounded-full items-center`}
//                 >
//                   <Text style={tw`text-white text-base font-roboto-500 `}>
//                     {step === 4 ? "Add" : "Done"}
//                   </Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </View>
//         </KeyboardAvoidingWrapper>
//       </Modal>
//     </Wrapper>
//   );
// };

// export default GetQuotesModal;








//  --------------------------- >>>>>>>>>>>>>>>>>>>>>>>----------------------
import {
  IconsBlackCancel,
  IconsButtomArrow,
  Iconsstap1,
  Iconsstap2,
  Iconsstap3,
  Iconsstap4
} from "@/assets/icons";
import { SelectedAsset } from "@/src/app/home-owner/(drawer)/(tabs)/add";
import tw from "@/src/lib/tailwind";
import { useGetAllCategoryQuery } from "@/src/redux/categoryWiseQuotesApi/categoryHomeApi";
import { useCretedUserQuoteMutation } from "@/src/redux/get_quote/quoteCreateApi";
import { makeImage } from "@/src/utils/image_converter";
import { width } from "@/src/utils/utils";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import KeyboardAvoidingWrapper from "../KeyboardAvoidingWrapper";
import Wrapper from "../Wrapper";
import SetDate from "./SetDate";
import SuccessMode from "./SuccessMode";
import UploadImages from "./UploadImage";

const propertyOptions = ["Single family home", "Commercial Property", "Apartment"];


type Props = {
  visible: boolean;
  onClose: () => void;
};

const GetQuotesModal = ({ visible, onClose }: Props) => {
  const [step, setStep] = useState(1);
  const [showCategories, setShowCategories] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState<SelectedAsset[]>([]);
  const [createQuote] = useCretedUserQuoteMutation();

  const [formData, setFormData] = useState({
    service: "",
    describe_issue: "",
    zip_code: "",
    property_type: "",
    address: "",
    expected_budget: "",
    photos: [] as string[],
    date: new Date().toISOString(),
  });

  const [successmodalVisible, setSuccessModalVisible] = useState<boolean>(false);



  const handleChange = (field: keyof typeof formData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = new FormData();

      const dateObj = new Date(formData?.date);

      // Format: MM/DD/YYYY
      const formattedDate = `${dateObj.getMonth() + 1
        }/${dateObj.getDate()}/${dateObj.getFullYear()}`;


      formDataToSend.append("service", formData.service);
      formDataToSend.append("describe_issue", formData.describe_issue);
      formDataToSend.append("zip_code", formData.zip_code);
      formDataToSend.append("property_type", formData.property_type);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("expected_budget", formData.expected_budget);
      formDataToSend.append("date", formattedDate);
      formDataToSend.append("service_type", formData.service);

      // selectedImages.forEach((img, index) => {
      //   formDataToSend.append(`photos[${index}]`, {
      //     uri: img.uri,
      //     name: img.fileName || `image_${Date.now()}_${index}.jpg`,
      //     type: img.mimeType || "image/jpeg",
      //   } as any);
      // });

      if (selectedImages.length > 0) {
        const file = selectedImages[0];

        if (file?.type === "video") {
          formDataToSend.append("video", {
            uri: file.uri,
            name: file.fileName || `video_${Date.now()}.mp4`,
            type: file.mimeType || "video/mp4",
          } as any);
        } else {
          selectedImages.forEach((img, index) => {
            formDataToSend.append(`photos[${index}]`, {
              uri: img.uri,
              name: img.fileName || `image_${Date.now()}_${index}.jpg`,
              type: img.mimeType || "image/jpeg",
            } as any);
          });
        }
      }

      await createQuote(formDataToSend).unwrap();
      setFormData({
        service: "",
        describe_issue: "",
        zip_code: "",
        property_type: "",
        address: "",
        expected_budget: "",
        photos: [],
        date: new Date().toISOString(),
      });
      setSelectedImages([]);
      setSuccessModalVisible(true); //  show modal on success
      setStep(1);
      onClose();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const renderStepIndicator = () => {
    const icons = [Iconsstap1, Iconsstap2, Iconsstap3, Iconsstap4];
    return (
      <View style={tw`items-center my-8`}>
        <SvgXml xml={icons[step - 1]} width={width > 400 ? 380 : 330} />
      </View>
    );
  };
  const { data } = useGetAllCategoryQuery();


  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <Text style={tw`text-base font-roboto-600 text-title_color mb-2`}>
              What service do you need?
            </Text>
            <TouchableOpacity
              onPress={() => setShowCategories(!showCategories)}
              style={tw`bg-[#ECF1F6] p-3 rounded-lg flex-row items-center justify-between gap-2`}
            >
              <Text style={tw`text-base text-title_color`}>
                {formData.service || "Select service"}
              </Text>
              <SvgXml xml={IconsButtomArrow} width={32} height={32} />
            </TouchableOpacity>

            {showCategories && (
              <View style={tw`flex-col gap-2 bg-input_bg_gray p-3 rounded-lg mt-2`}>
                {data?.data?.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      handleChange("service")(item?.name);
                      setShowCategories(false);
                    }}
                    style={tw`p-2 rounded-lg flex-row items-center gap-2 ${formData.service === item?.name ? "bg-blue-200" : ""
                      }`}
                  >
                    <Image source={{ uri: makeImage(item?.icon) }} style={tw`h-12 w-12`} />
                    <Text style={tw`text-center text-title_color font-roboto-400`}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            <Text style={tw`text-title_color text-base font-roboto-500 mt-4 mb-2`}>
              Describe the issue
            </Text>
            <TextInput
              style={tw`h-28 flex-1 p-3 bg-[#ECF1F6] rounded-lg text-base`}
              multiline
              placeholder="My pool pump is leaking & not working correctly..."
              placeholderTextColor="#454545"
              value={formData.describe_issue}
              onChangeText={handleChange("describe_issue")}
              textAlignVertical="top"
            />
          </>
        );

      case 2:
        return (
          <>
            <Text style={tw`text-base font-roboto-600 mb-2`}>Add ZIP code</Text>
            <TextInput
              placeholder="Write your zip code"
              style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-lg mb-4`}
              keyboardType="numeric"
              value={formData.zip_code}
              maxLength={5}
              onChangeText={handleChange("zip_code")}
            />

            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-base text-title_color font-roboto-500`}>
                Property type.
              </Text>
              {propertyOptions.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => handleChange("property_type")(type)}
                  style={tw`flex-row items-center mb-2`}
                >
                  <View
                    style={tw`w-4 h-4 rounded-full border-[1px] border-sub_title_color mr-2 items-center justify-center`}
                  >
                    {formData.property_type === type && (
                      <View style={tw`w-2 h-2 rounded-full bg-blue-600`} />
                    )}
                  </View>
                  <Text style={tw`text-base text-sub_title_color`}>{type}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        );

      case 3:
        return (
          <>
            <Text style={tw`text-base font-roboto-600 mb-2`}>Service address</Text>
            <TextInput
              placeholder="Enter your address"
              style={tw`bg-[#ECF1F6] h-12 px-2 flex-1 rounded-lg mb-4`}
              value={formData.address}
              onChangeText={handleChange("address")}
            />

            <View style={tw`flex-col gap-2`}>
              <Text style={tw`text-base text-title_color font-roboto-500`}>
                When do you need the service?
              </Text>
              <SetDate
                onDateChange={(date) => handleChange("date")(date.toISOString())}
                initialDate={new Date(formData.date)}
              />
            </View>

          </>
        );

      case 4:
        return (
          <>
            {
              formData?.service === "Pool Construction" && (
                <>
                  <Text style={tw`text-base font-roboto-600 mb-2`}>
                    What’s your expected budget?
                  </Text>
                  <TextInput
                    placeholder="e.g. $554.00"
                    keyboardType="numeric"
                    style={tw`border border-gray-300 h-12 px-2 flex-1 rounded-lg mb-4`}
                    value={formData.expected_budget}
                    onChangeText={handleChange("expected_budget")}
                  />
                </>

              )
            }

            <Text style={tw`text-title_color text-base font-roboto-500 mt-4 mb-2`}>
              Upload videos or photos of the issue
            </Text>
            <UploadImages
              selectedImages={selectedImages}
              setSelectedImages={setSelectedImages}
            />
          </>
        );

      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <Modal visible={visible} transparent animationType="fade">
        <KeyboardAvoidingWrapper>
          <View style={tw`flex-1 items-center justify-end bg-[#00000033]`}>
            <View style={tw`bg-white rounded-t-2xl p-[5%] h-[60%]`}>
              {/* Header */}
              <View style={tw`flex-row justify-between items-center`}>
                <Text style={tw`text-2xl text-title_color font-roboto-600`}>
                  Get Quotes
                </Text>
                <TouchableOpacity onPress={onClose}>
                  <SvgXml xml={IconsBlackCancel} />
                </TouchableOpacity>
              </View>

              {/* Steps */}
              <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1`}>
                {renderStepIndicator()}
                {renderStepContent()}
              </ScrollView>

              {/* Buttons */}
              <View style={tw`flex-row justify-between mt-6`}>
                {step === 1 ? (
                  <TouchableOpacity
                    onPress={onClose}
                    style={tw`flex-1 py-3 mr-2 border border-gray-400 rounded-full items-center`}
                  >
                    <Text style={tw`text-base font-roboto-500 text-secondary_button_color`}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => setStep(step - 1)}
                    style={tw`flex-1 py-3 mr-2 border border-gray-400 rounded-full items-center`}
                  >
                    <Text style={tw`text-base font-roboto-500 text-secondary_button_color`}>
                      Previous
                    </Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={handleNext}
                  style={tw`flex-1 py-3 ml-2 bg-[#003B73] rounded-full items-center flex-row justify-center`}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={tw`text-white text-base font-roboto-500`}>
                      {step === 4 ? "Add" : "Done"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingWrapper>
      </Modal>
      <SuccessMode
        setSuccessModalVisible={setSuccessModalVisible}
        successmodalVisible={successmodalVisible}
      />
    </Wrapper>
  );
};

export default GetQuotesModal;