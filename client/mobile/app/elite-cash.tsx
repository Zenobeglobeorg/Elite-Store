import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { AppHeader } from '@/components/app-header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Ionicons } from '@expo/vector-icons';
import { PRIMARY_COLOR } from '@/constants/theme';

export default function EliteCashScreen() {
  const router = useRouter();
  const [balance] = useState('250 000');
  const [mobileModalVisible, setMobileModalVisible] = useState(false);
  const [cardModalVisible, setCardModalVisible] = useState(false);
  const [transactionType, setTransactionType] = useState<'recharge' | 'retrait'>('recharge');

  const transactions = [
    { type: 'depot', amount: '50 000', date: '2024-01-15' },
    { type: 'retrait', amount: '25 000', date: '2024-01-14' },
    { type: 'depot', amount: '100 000', date: '2024-01-13' },
    { type: 'retrait', amount: '30 000', date: '2024-01-12' },
  ];

  const handlePaymentMethod = (method: 'mobile' | 'card') => {
    if (method === 'mobile') {
      setMobileModalVisible(true);
    } else {
      setCardModalVisible(true);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <AppHeader
        title="Gestion financière Elite cash"
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
          {/* Wallet Section */}
          <View style={styles.walletSection}>
            <Text style={styles.walletTitle}>Mon Portefeuille</Text>
            <Text style={styles.balance}>{balance} FCFA</Text>
            <Text style={styles.slogan}>VOTRE ARGENT EST SECURISÉ AVEC LE COEUR</Text>
          </View>

          {/* Transaction Section */}
          <View style={styles.transactionSection}>
            <Text style={styles.sectionTitle}>Effectuer une transaction</Text>
            
            <View style={styles.transactionButtons}>
              <TouchableOpacity
                style={[
                  styles.transactionButton,
                  transactionType === 'retrait' && styles.transactionButtonActive,
                ]}
                onPress={() => setTransactionType('retrait')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.transactionButtonText,
                    transactionType === 'retrait' && styles.transactionButtonTextActive,
                  ]}
                >
                  RETRAIT
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.transactionButton,
                  transactionType === 'recharge' && styles.transactionButtonActive,
                ]}
                onPress={() => setTransactionType('recharge')}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.transactionButtonText,
                    transactionType === 'recharge' && styles.transactionButtonTextActive,
                  ]}
                >
                  RECHARGE
                </Text>
              </TouchableOpacity>
            </View>

            {/* Payment Methods */}
            <View style={styles.paymentMethods}>
              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethod('mobile')}
                activeOpacity={0.8}
              >
                <Ionicons name="phone-portrait" size={32} color={PRIMARY_COLOR} />
                <Text style={styles.paymentMethodText}>Airtel Money</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethod('mobile')}
                activeOpacity={0.8}
              >
                <Ionicons name="phone-portrait" size={32} color={PRIMARY_COLOR} />
                <Text style={styles.paymentMethodText}>Moov Money</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethod('card')}
                activeOpacity={0.8}
              >
                <Ionicons name="card" size={32} color={PRIMARY_COLOR} />
                <Text style={styles.paymentMethodText}>VISA</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethod('card')}
                activeOpacity={0.8}
              >
                <Ionicons name="card" size={32} color={PRIMARY_COLOR} />
                <Text style={styles.paymentMethodText}>Mastercard</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.paymentMethod}
                onPress={() => handlePaymentMethod('card')}
                activeOpacity={0.8}
              >
                <Ionicons name="card" size={32} color={PRIMARY_COLOR} />
                <Text style={styles.paymentMethodText}>Carte bancaire</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Transaction History */}
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Historique des transactions</Text>
            {transactions.map((transaction, index) => (
              <View key={index} style={styles.transactionItem}>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionType}>
                    {transaction.type === 'depot' ? 'Dépôt effectuer :' : 'Retrait effectuer :'}
                  </Text>
                  <Text style={styles.transactionAmount}>
                    {transaction.amount} FCFA
                  </Text>
                </View>
                <Text style={styles.transactionDate}>{transaction.date}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Mobile Recharge/Withdrawal Modal */}
      <MobileTransactionModal
        visible={mobileModalVisible}
        onClose={() => setMobileModalVisible(false)}
        type={transactionType}
      />

      {/* Card Recharge/Withdrawal Modal */}
      <CardTransactionModal
        visible={cardModalVisible}
        onClose={() => setCardModalVisible(false)}
        type={transactionType}
      />
    </SafeAreaView>
  );
}

interface TransactionModalProps {
  visible: boolean;
  onClose: () => void;
  type: 'recharge' | 'retrait';
}

function MobileTransactionModal({ visible, onClose, type }: TransactionModalProps) {
  const [amount, setAmount] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleConfirm = () => {
    console.log(`${type} mobile:`, { amount, phoneNumber });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {type === 'recharge' ? 'Recharge' : 'Retrait'} / Retrait par Mobile
            </Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={28} color="#374151" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Input
              label="Entrée le Montant"
              value={amount}
              onChangeText={setAmount}
              placeholder="Montant en FCFA"
              keyboardType="numeric"
            />

            <Input
              label="Numéro de telephone"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Entrez le numéro"
              keyboardType="phone-pad"
            />

            <View style={styles.modalButtons}>
              <Button
                title="Confirmer"
                onPress={handleConfirm}
                style={styles.confirmButton}
              />
              <Button
                title="Annuler"
                onPress={onClose}
                variant="secondary"
                style={styles.cancelButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

function CardTransactionModal({ visible, onClose, type }: TransactionModalProps) {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  const handleConfirm = () => {
    console.log(`${type} card:`, { name, cardNumber, expiryDate, cvv, saveCard });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {type === 'recharge' ? 'Recharge' : 'Retrait'} / Retrait par carte
            </Text>
            <TouchableOpacity onPress={onClose} activeOpacity={0.7}>
              <Ionicons name="close" size={28} color="#374151" />
            </TouchableOpacity>
          </View>

          <View style={styles.modalBody}>
            <Input
              label="Nom"
              value={name}
              onChangeText={setName}
              placeholder="Nom sur la carte"
            />

            <Input
              label="Numéro carte"
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="0000 0000 0000 0000"
              keyboardType="numeric"
              maxLength={19}
            />

            <View style={styles.cardInfoRow}>
              <Input
                label="Expie date"
                value={expiryDate}
                onChangeText={setExpiryDate}
                placeholder="MM/YYYY"
                style={styles.cardInfoInput}
                maxLength={7}
              />
              <Input
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                placeholder="***"
                style={styles.cardInfoInput}
                keyboardType="numeric"
                maxLength={3}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.checkbox}
              onPress={() => setSaveCard(!saveCard)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={saveCard ? 'checkbox' : 'square-outline'}
                size={24}
                color={PRIMARY_COLOR}
              />
              <Text style={styles.checkboxText}>
                Enregistrer les informations de la carte
              </Text>
            </TouchableOpacity>

            <View style={styles.modalButtons}>
              <Button
                title="Payer"
                onPress={handleConfirm}
                style={styles.confirmButton}
              />
              <Button
                title="Annuler"
                onPress={onClose}
                variant="secondary"
                style={styles.cancelButton}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
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
  walletSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  walletTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 12,
  },
  balance: {
    fontSize: 36,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
    marginBottom: 8,
  },
  slogan: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  transactionSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  transactionButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  transactionButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  transactionButtonActive: {
    backgroundColor: PRIMARY_COLOR,
    borderColor: PRIMARY_COLOR,
  },
  transactionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  transactionButtonTextActive: {
    color: '#FFFFFF',
  },
  paymentMethods: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  paymentMethod: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  paymentMethodText: {
    fontSize: 12,
    color: '#374151',
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '500',
  },
  historySection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  transactionInfo: {
    flex: 1,
  },
  transactionType: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  transactionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  modalBody: {
    padding: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 24,
  },
  confirmButton: {
    flex: 1,
  },
  cancelButton: {
    flex: 1,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
  },
  checkboxText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
  },
  cardInfoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  cardInfoInput: {
    flex: 1,
  },
});


