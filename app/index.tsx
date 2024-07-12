import { useEffect, useCallback } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { Text, Card, Divider } from "react-native-paper";
import { FontAwesome } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from "../data/hooks";
import { fetchItems, setCurrentPage, resetProperties } from "../data/propertiesListSlice";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { imageBlurHash } from "@/constants/Placeholdets";

export default function Index() {
    const dispatch = useAppDispatch();
    const { properties, currentPage, totalItems, loading, filters } = useAppSelector((state) => state.propertiesList);

    const loadItems = useCallback(() => {
        dispatch(fetchItems({ currentPage, filters }));
    }, [currentPage, filters, dispatch]);

    useEffect(() => {
        loadItems();
    }, [loadItems]);

    const handleLoadMore = () => {
        if (properties.length < totalItems) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handleRefresh = async () => {
        dispatch(resetProperties());
        dispatch(setCurrentPage(1));
        await loadItems();
    };

    const renderLoading = () => {
        if (!loading) return null;
        return (
            <View style={{ paddingVertical: 20 }}>
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={{textAlign:'center', marginBottom:4}}>{properties.length}/{totalItems}</Text>
            <FlatList
                refreshing={loading && currentPage === 1} // Only show refreshing spinner when loading the first page
                onRefresh={handleRefresh}
                data={properties}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <Link href={`/${item.slug}`}>
                        <Card style={styles.item}>
                            <View style={{ width: '100%', height: 200 }}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={{ uri: item.images?.at(0) ?? "" }}
                                    transition={200}
                                    contentFit="cover"
                                    placeholder={imageBlurHash}
                                />
                            </View>
                            <Card.Title
                                title={item.type}
                                subtitle={`${item.address_city}, ${item.address_state}, ${item.address_country}`}
                                subtitleStyle={{ fontSize: 14 }}
                            />
                            <Card.Content>
                                <Text variant="bodyMedium">{item.title}</Text>
                            </Card.Content>
                            <Card.Content>
                                <View style={{ marginTop: 16, flexDirection: 'row', justifyContent: "space-between", alignItems: 'baseline', width: '100%' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                                        {item.minPrice?.toLocaleString('en')} EGP
                                    </Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'baseline', columnGap: 6 }}>
                                        <Text variant="bodyMedium"><FontAwesome name="bed" size={20} color="black" /> {item.bedrooms}</Text>
                                        <Text variant="bodyMedium"><FontAwesome name="bathtub" size={20} color="black" /> {item.bathrooms}</Text>
                                        <Text variant="bodyMedium"><SimpleLineIcons name="size-fullscreen" size={15} color="black" /> {item.minArea} m²</Text>
                                    </View>
                                </View>
                            </Card.Content>
                        </Card>
                    </Link>
                )}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={renderLoading}
                ItemSeparatorComponent={() => <Divider style={styles.divider} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    item: {
        marginVertical: 8,
    },
    divider: {
        marginTop: 8,
        marginBottom: 12
    }
});
