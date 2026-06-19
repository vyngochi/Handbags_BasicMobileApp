import { Button } from "@/components/ui/button";
import { HandbagResponse } from "@/features/handbags/types/handbag.type";
import { useMapStore } from "@/stores/map.store";
import { Locate, Store } from "lucide-react-native";
import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { useMap } from "../hooks/useMap";

interface MapViewStoresProps {
  data: HandbagResponse[] | undefined;
}
export default function MapViewStores({ data }: MapViewStoresProps) {
  const {
    mapRef,
    markerRefs,
    currentRegion,
    userLocation,
    setCurrentRegion,
    handleRelocate,
    handleZoom,
    destination,
    setDestination,
    handleSetUserRegion,
    handleFocusStore,
  } = useMap();

  const mapStore = useMapStore();

  useEffect(() => {
    handleSetUserRegion();
  }, []);

  useEffect(() => {
    if (!mapStore.storeRegion) {
      return;
    }
    handleFocusStore(mapStore.storeRegion);
  }, [mapStore.storeRegion]);

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={currentRegion}
        showsUserLocation={true}
        showsMyLocationButton={false}
        onRegionChangeComplete={(region) => setCurrentRegion(region)}
        loadingIndicatorColor="blue"
      >
        {data?.map((item) => {
          const key = `${item.coordinates.latitude}-${item.coordinates.longitude}`;
          return (
            <Marker
              ref={(ref) => {
                markerRefs.current[key] = ref;
              }}
              key={item.id}
              coordinate={{
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude,
              }}
              onPress={() =>
                setDestination({
                  latitude: item.coordinates.latitude,
                  longitude: item.coordinates.longitude,
                })
              }
            >
              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.title}>{item.brand}</Text>
                  <Text style={styles.address}>{item.coordinates.address}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}

        {userLocation && destination && (
          <MapViewDirections
            origin={userLocation}
            destination={destination}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_MAP_API ?? ""}
            strokeWidth={4}
            strokeColor="#2196F3"
            mode="DRIVING"
            onReady={(result) => {
              mapRef.current?.fitToCoordinates(result.coordinates, {
                edgePadding: { right: 50, bottom: 50, left: 50, top: 100 },
              });
            }}
            onError={(errorMessage) => {
              console.log("Lỗi chỉ đường: ", errorMessage);
            }}
          />
        )}
      </MapView>
      <View style={styles.floatingMenu}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleZoom("in")}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => handleZoom("out")}
        >
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <View style={styles.divider} />

        <TouchableOpacity style={styles.menuButton} onPress={handleRelocate}>
          <Locate size={24} />
        </TouchableOpacity>
      </View>

      <View className="absolute bottom-2 right-2">
        <Button
          className="p-3 bg-white rounded-full"
          variant={"outline"}
          size={"icon"}
          onPress={() => mapStore.setIsOpenSuggest(true)}
        >
          <Store className="p-5" size={30} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  calloutContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    width: 200,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  brand: {
    color: "#666",
    fontSize: 14,
  },
  price: {
    color: "green",
    fontWeight: "600",
    marginVertical: 4,
  },
  address: {
    fontSize: 12,
    color: "#888",
  },
  floatingMenu: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    overflow: "hidden",
  },
  menuButton: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    width: "100%",
  },
});
