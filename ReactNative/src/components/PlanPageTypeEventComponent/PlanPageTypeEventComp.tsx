import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { PlanTypeEvent1, PlanTypeEvent2, PlanTypeEvent3, PlanTypeEvent4 } from "../Svgs";
import { router } from "expo-router";

export function PlanTypeButton(){
    return(
        <TouchableOpacity onPress={() => {router.push("..")}} >
            <PlanTypeEvent1/>
        </TouchableOpacity>
    );
}
export function NextButton() {
    return (
      <TouchableOpacity  onPress={() => {router.push("..")}} style={style.NextButton}>
        <Text style={style.NextButtonText}>Próximo</Text>
      </TouchableOpacity>
    );
  }
  const style = StyleSheet.create({
   
    NextButton: {
      justifyContent: "center",
      position: "relative",
      top: 330,
      left: 85,
      width: 233,
      height: 56, 
      paddingVertical: 12,
      backgroundColor: "black",
      paddingHorizontal: 3,
      borderRadius: 20,
      marginBottom: 30,
    },
    NextButtonText: {
      fontFamily: "Poppins",
      color: "#ffffff",
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      letterSpacing: 1,
    },
  });
  export function OptionsTypeMarriageEvent(){
    return(
        <View>
            <TouchableOpacity onPress={() => {router.push("..")}} >
                <PlanTypeEvent1/>
            </TouchableOpacity>
        </View>
    );
  }
  export function OptionsTypeBirthdayEvent(){
    return(
        <View>
            <TouchableOpacity onPress={() => {router.push("..")}} >
                <PlanTypeEvent2/>
            </TouchableOpacity>
        </View>
    );
  }
  export function OptionsTypeTripEvent(){
    return(
        <View>
            <TouchableOpacity onPress={() => {router.push("..")}} >
                <PlanTypeEvent3/>
            </TouchableOpacity>
        </View>
    );
  }
  export function OptionsTypeRolePartyEvent(){
    return(
        <View>
            <TouchableOpacity onPress={() => {router.push("..")}} >
                <PlanTypeEvent4/>
            </TouchableOpacity>
        </View>  
    );
  }
