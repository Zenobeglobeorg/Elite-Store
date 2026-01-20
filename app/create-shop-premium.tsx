import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/app-header';
import { CollapsibleSection } from '@/components/ui/collapsible-section';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function CreateShopPremiumScreen() {
  const router = useRouter();
  const [shopName, setShopName] = useState('');
  const [logo, setLogo] = useState('');
  const [slogan, setSlogan] = useState('');
  const [banner, setBanner] = useState('');
  const [colorPalette, setColorPalette] = useState('');

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <AppHeader
        title="Création de votre boutique Premium"
        showMenu={false}
        showCart={false}
        showCurrency
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Identité Visuelle et branding */}
          <CollapsibleSection
            title="1. Identité Visuelle et branding"
            defaultExpanded={true}
            headerColor={PRIMARY_COLOR}
          >
            <Input
              label="Nom de la boutique"
              value={shopName}
              onChangeText={setShopName}
              placeholder="Entrez le nom de votre boutique"
            />

            <TouchableOpacity
              style={styles.fileInput}
              onPress={() => console.log('Add logo')}
            >
              <Ionicons name="image-outline" size={24} color={PRIMARY_COLOR} />
              <Text style={styles.fileInputText}>Ajouter votre logo</Text>
            </TouchableOpacity>

            <Input
              label="Ajouter votre Slogan"
              value={slogan}
              onChangeText={setSlogan}
              placeholder="Entrez votre slogan"
            />

            <TouchableOpacity
              style={styles.fileInput}
              onPress={() => console.log('Add banner')}
            >
              <Ionicons name="image-outline" size={24} color={PRIMARY_COLOR} />
              <Text style={styles.fileInputText}>Ajouter votre bannière</Text>
            </TouchableOpacity>

            <Input
              label="Palette de Couleurs"
              value={colorPalette}
              onChangeText={setColorPalette}
              placeholder="Sélectionnez votre palette de couleurs"
            />
          </CollapsibleSection>

          {/* Section 2: Informations de vente et contact */}
          <CollapsibleSection
            title="2. Informations de vente et contact"
            defaultExpanded={false}
            headerColor={PRIMARY_COLOR}
          >
            <ShopInfoForm />
          </CollapsibleSection>

          {/* Section 3: Configuration des achats et livraisons */}
          <CollapsibleSection
            title="3. Configuration des achats et livraisons (Logistique Elite)"
            defaultExpanded={false}
            headerColor={PRIMARY_COLOR}
          >
            <LogisticsConfigForm />
          </CollapsibleSection>

          {/* Section 4: Configuration des livraisons */}
          <CollapsibleSection
            title="Configuration des livraisons (Logistique Elite)"
            defaultExpanded={false}
            headerColor={PRIMARY_COLOR}
            icon="diamond"
          >
            <DeliveryConfigForm />
          </CollapsibleSection>

          {/* Create Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="CREER MAINTENANT"
              onPress={() => {
                console.log('Create shop');
                router.back();
              }}
              style={styles.createButton}
              textStyle={styles.createButtonText}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function ShopInfoForm() {
  const [category, setCategory] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [shareWhatsapp, setShareWhatsapp] = useState(false);
  const [chatEnabled, setChatEnabled] = useState(false);
  const [description, setDescription] = useState('');

  return (
    <View>
      <Input
        label="Sélectionner la catégorie de boutique"
        value={category}
        onChangeText={setCategory}
        placeholder="Choisissez une catégorie"
      />

      <Input
        label="Configuration WhatsApp (lien direct)"
        value={whatsapp}
        onChangeText={setWhatsapp}
        placeholder="Entrez votre lien WhatsApp"
      />

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setShareWhatsapp(!shareWhatsapp)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={shareWhatsapp ? 'checkbox' : 'square-outline'}
          size={24}
          color={PRIMARY_COLOR}
        />
        <Text style={styles.checkboxText}>
          Autoriser le partage de ma boutique sur mes statuts WhatsApp en un Clic
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setChatEnabled(!chatEnabled)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={chatEnabled ? 'checkbox' : 'square-outline'}
          size={24}
          color={PRIMARY_COLOR}
        />
        <Text style={styles.checkboxText}>
          Activer le chat client-vendeur
        </Text>
      </TouchableOpacity>

      <Input
        label="Description de la Boutique"
        value={description}
        onChangeText={setDescription}
        placeholder="Décrivez votre boutique"
        multiline
        numberOfLines={4}
        style={styles.textArea}
      />
    </View>
  );
}

function LogisticsConfigForm() {
  const [location, setLocation] = useState('');
  const [schedule, setSchedule] = useState('');
  const [deliveryPerson, setDeliveryPerson] = useState('');
  const [deliveryPolicy, setDeliveryPolicy] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.checkbox}
        onPress={() => setReminderEnabled(!reminderEnabled)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={reminderEnabled ? 'checkbox' : 'square-outline'}
          size={24}
          color={PRIMARY_COLOR}
        />
        <Text style={styles.checkboxText}>
          Relancez en un clic les clients qui à visiter la boutique
        </Text>
      </TouchableOpacity>

      <Input
        label="Localisation de la boutique"
        value={location}
        onChangeText={setLocation}
        placeholder="Entrez l'adresse de votre boutique"
      />

      <Input
        label="Disponibilité (Horaire Elite)"
        value={schedule}
        onChangeText={setSchedule}
        placeholder="Entrez vos horaires"
      />

      <Input
        label="Associer un livreur à ma boutique"
        value={deliveryPerson}
        onChangeText={setDeliveryPerson}
        placeholder="Sélectionnez un livreur"
      />

      <Input
        label="Politique de livraison"
        value={deliveryPolicy}
        onChangeText={setDeliveryPolicy}
        placeholder="Décrivez votre politique de livraison"
        multiline
        numberOfLines={3}
        style={styles.textArea}
      />
    </View>
  );
}

function DeliveryConfigForm() {
  const [deliveryOptions, setDeliveryOptions] = useState('');
  const [deliveryZones, setDeliveryZones] = useState('');
  const [deliveryCost, setDeliveryCost] = useState('');

  return (
    <View>
      <Input
        label="Options de livraison"
        value={deliveryOptions}
        onChangeText={setDeliveryOptions}
        placeholder="Configurez vos options de livraison"
      />

      <Input
        label="Zones de livraison"
        value={deliveryZones}
        onChangeText={setDeliveryZones}
        placeholder="Définissez vos zones de livraison"
      />

      <Input
        label="Coûts de livraison"
        value={deliveryCost}
        onChangeText={setDeliveryCost}
        placeholder="Configurez vos tarifs de livraison"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  fileInput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
  },
  fileInputText: {
    marginLeft: 12,
    fontSize: 16,
    color: PRIMARY_COLOR,
    fontWeight: '500',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  createButton: {
    backgroundColor: '#111827',
    borderRadius: 12,
  },
  createButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


