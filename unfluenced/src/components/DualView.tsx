import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import type { Fact } from '../data/exclusionCriteria';
import { FactCard } from './FactCard';

interface Props {
  concernAHeader: string;
  concernBHeader: string;
  factsA: Fact[];
  factsB: Fact[];
  /** Optional third perspective — use sparingly, only when a third distinct legal/factual position exists */
  concernCHeader?: string;
  factsC?: Fact[];
  sharedFacts?: Fact[];
  onSourcePress?: (sourceId: string) => void;
}

type Side = 'A' | 'B' | 'C' | 'shared';

export function DualView({
  concernAHeader,
  concernBHeader,
  factsA,
  factsB,
  concernCHeader,
  factsC = [],
  sharedFacts = [],
  onSourcePress,
}: Props) {
  const [activeSide, setActiveSide] = useState<Side>('A');

  const activeFacts: Fact[] =
    activeSide === 'A' ? factsA
    : activeSide === 'B' ? factsB
    : activeSide === 'C' ? factsC
    : sharedFacts;

  const activeHeader =
    activeSide === 'A' ? concernAHeader
    : activeSide === 'B' ? concernBHeader
    : activeSide === 'C' ? (concernCHeader ?? '')
    : 'Facts relevant to all perspectives';

  return (
    <View style={styles.container}>
      {/* Tab bar */}
      <View style={styles.tabs}>
        <TabButton
          label="Concern A"
          active={activeSide === 'A'}
          onPress={() => setActiveSide('A')}
          color="#2563eb"
        />
        <TabButton
          label="Concern B"
          active={activeSide === 'B'}
          onPress={() => setActiveSide('B')}
          color="#7c3aed"
        />
        {concernCHeader && factsC.length > 0 && (
          <TabButton
            label="Perspective C"
            active={activeSide === 'C'}
            onPress={() => setActiveSide('C')}
            color="#0f766e"
          />
        )}
        {sharedFacts.length > 0 && (
          <TabButton
            label="Shared Data"
            active={activeSide === 'shared'}
            onPress={() => setActiveSide('shared')}
            color="#475569"
          />
        )}
      </View>

      {/* Active concern header */}
      <View style={styles.headerBox}>
        <Text style={styles.headerLabel}>THE CONCERN</Text>
        <Text style={styles.headerText}>{activeHeader}</Text>
      </View>

      {/* Neutrality notice */}
      <View style={styles.notice}>
        <Text style={styles.noticeText}>
          These facts are not arguments — they are verified data. Every
          perspective deserves the same honest picture.
        </Text>
      </View>

      {/* Facts */}
      {activeFacts.map((fact) => (
        <FactCard key={fact.id} fact={fact} onSourcePress={onSourcePress} />
      ))}
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
  color,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
  color: string;
}) {
  return (
    <TouchableOpacity
      style={[styles.tab, active && { borderBottomColor: color, borderBottomWidth: 2 }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.tabText, active && { color, fontWeight: '600' }]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    marginBottom: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 13,
    color: '#94a3b8',
  },
  headerBox: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  headerLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
    marginBottom: 4,
  },
  headerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
    lineHeight: 22,
  },
  notice: {
    paddingHorizontal: 4,
    marginBottom: 10,
  },
  noticeText: {
    fontSize: 11,
    color: '#94a3b8',
    fontStyle: 'italic',
    lineHeight: 16,
  },
});
