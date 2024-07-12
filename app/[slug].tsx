import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { Text, Divider } from 'react-native-paper';
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useAppDispatch, useAppSelector } from '@/data/hooks';
import MapView, { Marker } from 'react-native-maps';
import { fetchPropertyDetails, resetPropertyDetails } from '@/data/propertyDetailsSlice';
import { useLocalSearchParams } from 'expo-router'
import { imageBlurHash, planBlurHash } from '@/constants/Placeholdets';

const PropertyDetails = () => {
    const { slug } = useLocalSearchParams();

    const dispatch = useAppDispatch();

    const { property, loading, error } = useAppSelector((state) => state.propertyDetails);

    useEffect(() => {
        console.log(slug);
        if (!slug || Array.isArray(slug)) {
            return;
        }

        dispatch(fetchPropertyDetails(slug));

        return () => {
            dispatch(resetPropertyDetails());
        };

    }, [dispatch, slug]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    if (!property) {
        return null;
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Image placeholder={imageBlurHash} contentFit='cover' transition={200}  source={{ uri: property.images?.[0] }} style={styles.mainImage} />
            <View style={styles.details}>
                <Text variant="titleLarge" style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 12 }}>{property.title}</Text>

                <Text variant='bodyLarge' style={{ fontSize: 16, marginBottom: 12 }}>{property.address_city}, {property.address_state}, {property.address_country}</Text>

                <Text variant="bodyLarge" style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 12 }}>{property.minPrice?.toLocaleString('en')} EGP</Text>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <Text>{property.bedrooms} <FontAwesome name="bed" size={20} color="black" /></Text>
                    <Text>{property.bathrooms} <FontAwesome name="bathtub" size={20} color="black" /></Text>
                    <Text>{property.minArea} m² <SimpleLineIcons name="size-fullscreen" size={15} color="black" /></Text>
                </View>

                <Divider style={styles.divider} />

                {property.images && property.images.length > 0 && (
                    <>
                        <Text variant="titleMedium" style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Images</Text>
                        <View style={styles.imagesGrid}>
                            {property.images.map((image, index) => (
                                <Image placeholder={imageBlurHash} contentFit='cover' transition={200} key={index} source={{ uri: image }} style={styles.gridImage} />
                            ))}
                        </View>
                        <Divider style={styles.divider} />
                    </>
                )}

                {property.plans && property.plans.length > 0 && (
                    <>
                        <Text variant="titleMedium" style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Plans</Text>
                        <View style={styles.imagesGrid}>
                            {property.plans.map((plan, index) => (
                                <Image placeholder={planBlurHash} contentFit='cover' transition={200} key={index} source={{ uri: plan }} style={styles.gridImage} />
                            ))}
                        </View>
                        <Divider style={styles.divider} />
                    </>
                )}

                {property.location_lat && property.location_lon && (
                    <>
                        <Text variant="titleMedium" style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Location</Text>
                        <MapView
                            style={styles.map}
                            initialRegion={{
                                latitude: property.location_lat,
                                longitude: property.location_lon,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                        >
                            <Marker coordinate={{ latitude: property.location_lat, longitude: property.location_lon }} />
                        </MapView>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    mainImage: {
        width: '100%',
        height: 200,
        marginBottom: 20,
    },
    details: {
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    htmlText: {
        marginVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    imagesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    gridImage: {
        width: '48%',
        height: 100,
        marginBottom: 10,
    },
    divider: {
        marginVertical: 20,
    },
    map: {
        width: '100%',
        height: 200,
        marginTop: 20,
    },
});

export default PropertyDetails;