import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import type { Fact } from '../data/exclusionCriteria';
import { SourceBadge } from './SourceBadge';

interface Props {
  fact: Fact;
  onSourcePress?: (sourceId: string) => void;
}

export function FactCard({ fact, onSourcePress }: Props) {
  const displayValue =
    typeof fact.value === 'number'
      ? fact.value === 0
        ? 'See context'
        : fact.value.toLocaleString('en-US')
      : fact.value;

  return (
    <View style={styles.card}>
      <Text style={styles.stat}>{fact.stat}</Text>

      <View style={styles.valueRow}>
        <Text style={styles.value}>{displayValue}</Text>
        <Text style={styles.unit}>{fact.unit}</Text>
      </View>

      {fact.contextNote && (
        <View style={styles.contextBox}>
          <Text style={styles.contextLabel}>CONTEXT</Text>
          <Text style={styles.contextText}>{fact.contextNote}</Text>
        </View>
      )}

      <View style={styles.meta}>
        {fact.adjustedForInflation && (
          <Text style={styles.metaTag}>CPI-adjusted</Text>
        )}
        {fact.unemploymentMeasure && (
          <Text style={styles.metaTag}>{fact.unemploymentMeasure} measure</Text>
        )}
        {fact.rateType && (
          <Text style={styles.metaTag}>{fact.rateType} rate</Text>
        )}
        <Text style={styles.metaTag}>{fact.geographicScope}</Text>
      </View>

      <TouchableOpacity
        onPress={() => onSourcePress?.(fact.sourceId)}
        activeOpacity={0.7}
      >
        <SourceBadge sourceId={fact.sourceId} year={fact.year} />
      </TouchableOpacity>

      {fact.corroboratingSourceIds.map((id) => (
        <TouchableOpacity
          key={id}
          onPress={() => onSourcePress?.(id)}
          activeOpacity={0.7}
        >
          <SourceBadge sourceId={id} year={fact.year} />
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  stat: {
    fontSize: 14,
    color: '#334155',
    lineHeight: 20,
    marginBottom: 8,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
    marginBottom: 10,
  },
  value: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0f172a',
  },
  unit: {
    fontSize: 13,
    color: '#64748b',
  },
  contextBox: {
    backgroundColor: '#f1f5f9',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
  },
  contextLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  contextText: {
    fontSize: 13,
    color: '#475569',
    lineHeight: 18,
  },
  meta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  metaTag: {
    fontSize: 10,
    color: '#64748b',
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: 'capitalize',
  },
});
