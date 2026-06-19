import * as Location from "expo-location";
import { useRef, useState } from "react";
import MapView, { LatLng, MapMarker, Region } from "react-native-maps";

export const useMap = () => {
  const mapRef = useRef<MapView>(null);
  const markerRefs = useRef<Record<string, MapMarker | null>>({});
  const [userLocation, setUserLocation] = useState<Region>();
  const [destination, setDestination] = useState<LatLng>();

  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: 10.762622,
    longitude: 106.660172,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const handleSetUserRegion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
    }

    const location = await Location.getCurrentPositionAsync({});

    const userRegion: Region = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    setUserLocation(userRegion);

    return { userRegion };
  };

  const handleRelocate = async () => {
    const { userRegion } = await handleSetUserRegion();

    mapRef.current?.animateToRegion(userRegion, 1000);
  };

  const handleZoom = (action: "in" | "out") => {
    const multiplier = action === "in" ? 0.5 : 2;

    const newRegion = {
      ...currentRegion,
      latitudeDelta: currentRegion.latitudeDelta * multiplier,
      longitudeDelta: currentRegion.longitudeDelta * multiplier,
    };

    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const handleFocusStore = (region: Region) => {
    mapRef.current?.animateToRegion(region, 500);

    const key = `${region.latitude}-${region.longitude}`;

    setTimeout(() => {
      markerRefs.current[key]?.showCallout();
    }, 600);
  };

  return {
    mapRef,
    markerRefs,
    currentRegion,
    setCurrentRegion,
    handleRelocate,
    handleZoom,
    userLocation,
    destination,
    setDestination,
    handleSetUserRegion,
    handleFocusStore,
  };
};
