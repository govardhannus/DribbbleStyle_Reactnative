// components/Hello.tsx
import React ,{Component}from 'react';
import { StyleSheet, View, Image,FlatList,Text} from 'react-native';
import axios from 'axios';

interface Props {
}

interface State {
  mediaList:Media[];
  refreshing:boolean;
  pages:number
}

interface Media {
  animated: Boolean;
  description:String;
  images:Images;
}

interface Images {
  hidpi:String;
}


export default class DribbbleList extends Component<Props,State> {

constructor(props:Props){
  super(props)
  this.state = {
    mediaList:[],
    refreshing:false,
    pages:1
  }
}

  componentDidMount(){ 
    this.dridddleList(false);
    
  }

  dridddleList(refresh:Boolean) {
    axios.get("https://api.dribbble.com/v2/user/shots?page="+this.state.pages+"&access_token=04421eae72868ea04ad20aa673ddd5bb633ed7032dc27212f385039e080d7f49")   
    .then(response => {
     if(refresh == false){
      this.setState({
        mediaList:this.state.mediaList.concat(response.data),
        refreshing:false
      });
     }else{
      this.setState({
        mediaList:response.data,
        refreshing:false
      });
     }
       console.log(this.state.mediaList);
     })   
    .catch((error) => {
       console.log('error ' + error);  
       this.setState({
        refreshing:false
      }); 
    });
  }

  onRefresh() {
    this.setState({refreshing: true,pages: 1},() => {this.dridddleList(true)});

}

handleLoadMore(){
  this.setState({pages: this.state.pages + 1},() => {this.dridddleList(false)});
}
  
  render() {
    const renderItem = ({item} :{item:Media}) => (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" ,margin:10}}>
        <View style={{ backgroundColor: "#eee", borderRadius: 10, overflow: "hidden" }}>
          <View>
            <Image
              source={{uri:item.images.hidpi}}
              style={{
                height: 200,
                width: "100%"
              }}
            />
          </View>
          <View style={{ marginHorizontal: 30, width: 400, margin:10 }}>
            <Text style={{ color: "#777", paddingTop: 5 }}>
             Likes:
            </Text>
          </View>
        </View>
      </View>
    );
    return (
      <View style={styles.container}>
       <FlatList<Media>
        data={this.state.mediaList}
        renderItem={renderItem}
        onRefresh={() => this.onRefresh()}
        refreshing={this.state.refreshing}
        onEndReached={() => this.handleLoadMore()}
        onEndReachedThreshold={0}
        contentContainerStyle={{ paddingBottom: 30}}
      />
      </View>
    );
  }
}

// styles
const styles = StyleSheet.create({
  container: {
   marginTop:10,
   marginBottom:10
  },
});