import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from "react-native";
import { styles } from "./styles";


interface PagamentoProps {
  visible: boolean;
  onClose: () => void;
}

export default function Pagamento({ visible, onClose }: PagamentoProps) {
    
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sheet}>
          {/* Botão de fechar */}
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          {/* Barra de progresso fake */}
          <View style={styles.progressContainer}>
            <Image source={require("../../assets/icon.png")} style={styles.progressImg} />
          </View>

          {/* Status */}
          <Text style={styles.statusTitle}>Payment Status</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Your payment received</Text>
            <Text style={styles.amountValue}>USD 1000.00</Text>
          </View>

          {/* Detalhes */}
          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transfer ID</Text>
              <Text style={styles.detailValue}>0000000</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>Received</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>You transfer</Text>
              <Text style={styles.detailValue}>USD 1000.00</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transfer fee</Text>
              <Text style={styles.detailValue}>Free</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total amount</Text>
              <Text style={styles.detailValue}>USD 1000.00</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date</Text>
              <Text style={styles.detailValue}>20.10.03</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Time</Text>
              <Text style={styles.detailValue}>14:35 pm</Text>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}