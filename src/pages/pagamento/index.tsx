import React from "react";
import { View, Text, Modal, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";

interface PagamentoProps {
  visible: boolean;
  onClose: () => void;
  valor: number;
  mesa: number;
  status: "sucesso" | "processando" | "erro";
  formaPagamento: string;
  fecharMesa: () => void | Promise<void>;
}

export default function Pagamento({ visible, onClose, valor, mesa, status, formaPagamento, fecharMesa }: PagamentoProps) {
  // Ícone/status visual
  const getStatusIcon = () => {
    if (status === "sucesso") {
      return <Image source={require("../../assets/icon.png")} style={styles.progressImg} />;
    }
    if (status === "erro") {
      return <Image source={require("../../assets/icon.png")} style={styles.progressImg} />;
    }
    return <Image source={require("../../assets/icon.png")} style={styles.progressImg} />;
  };
  

  const getStatusMessage = () => {
    if (status === "sucesso") return "Pagamento aprovado!";
    if (status === "erro") return "Pagamento recusado!";
    return "Processando pagamento...";
  };

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

          {/* Status visual */}
          <View style={styles.progressContainer}>
            {getStatusIcon()}
          </View>

          {/* Status e valor */}
          <Text style={styles.statusTitle}>{getStatusMessage()}</Text>
          <View style={styles.amountBox}>
            <Text style={styles.amountLabel}>Valor total</Text>
            <Text style={styles.amountValue}>R$ {typeof valor === "number" && !isNaN(valor) ? valor.toFixed(2) : "0.00"}</Text>
          </View>

          {/* Detalhes do pagamento */}
          <View style={styles.detailsBox}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Mesa</Text>
              <Text style={styles.detailValue}>{mesa}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Forma de pagamento</Text>
              <Text style={styles.detailValue}>{formaPagamento}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Status</Text>
              <Text style={styles.detailValue}>{getStatusMessage()}</Text>
            </View>
          
          </View>

          {/* Botão de fechar extra */}
          <TouchableOpacity 
          style={styles.fecharBtn} 
          onPress={fecharMesa}>
            <Text 
            style={styles.fecharBtnText}>Confirmar Fechamento</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}