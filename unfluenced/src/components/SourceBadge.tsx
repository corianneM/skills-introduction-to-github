import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getSourceById, getTierLabel } from '../data/sources';

interface Props {
  sourceId: string;
  year: number;
}

const TIER_COLORS: Record<1 | 2 | 3, string> = {
  1: '#16a34a', // green — government
  2: '#2563eb', // blue — non-partisan research
  3: '#d97706', // amber — use data only
};

export function SourceBadge({ sourceId, year }: Props) {
  const source = getSourceById(sourceId);
  if (!source) return null;

  return (
    <View style={[styles.badge, { borderLeftColor: TIER_COLORS[source.tier] }]}>
      <Text style={[styles.tierLabel, { color: TIER_COLORS[source.tier] }]}>
        {getTierLabel(source.tier)}
      </Text>
      <Text style={styles.sourceName}>
        {source.name} · {year}
      </Text>
      {source.tier === 3 && (
        <Text style={styles.tier3Warning}>Data tables only — verify with Tier 1 source</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderLeftWidth: 3,
    paddingLeft: 8,
    paddingVertical: 4,
    marginTop: 6,
    backgroundColor: '#f8fafc',
  },
  tierLabel: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sourceName: {
    fontSize: 12,
    color: '#475569',
    marginTop: 1,
  },
  tier3Warning: {
    fontSize: 10,
    color: '#d97706',
    marginTop: 2,
    fontStyle: 'italic',
  },
});
