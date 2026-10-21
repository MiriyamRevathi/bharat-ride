/**
 * BharatRide Transit Management System - Type Definitions
 * Category: fleet_telemetry
 * Component: Fuel Tank Ultrasonic Sensor and Theft Siphoning Detector (fuel-consumption-telemetry)
 * Enterprise bus transport architecture, telematics schemas, and lifecycle enums.
 */

export enum FuelConsumptionTelemetryStatus {
  INITIALIZED = 'INITIALIZED',
  ACTIVE = 'ACTIVE',
  PENDING_DISPATCH = 'PENDING_DISPATCH',
  EN_ROUTE = 'EN_ROUTE',
  HALTED_AT_STATION = 'HALTED_AT_STATION',
  OPTIMIZING_PATH = 'OPTIMIZING_PATH',
  MAINTENANCE_REQUIRED = 'MAINTENANCE_REQUIRED',
  COMPLETED = 'COMPLETED',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}}

export enum FuelConsumptionTelemetryPriority {
  CRITICAL_EMERGENCY = 'CRITICAL_EMERGENCY',
  HIGH_PRIORITY = 'HIGH_PRIORITY',
  STANDARD_TRANSIT = 'STANDARD_TRANSIT',
  OFF_PEAK = 'OFF_PEAK',
  BACKGROUND_AUDIT = 'BACKGROUND_AUDIT',
}}

export enum FuelConsumptionTelemetryRegulatoryTier {
  MORTH_NATIONAL_STANDARD = 'MORTH_NATIONAL_STANDARD',
  AIS_140_SAFETY_COMPLIANT = 'AIS_140_SAFETY_COMPLIANT',
  STATE_STAGE_CARRIAGE = 'STATE_STAGE_CARRIAGE',
  INTERCITY_COMMERCIAL = 'INTERCITY_COMMERCIAL',
  PRIVATE_OPERATOR_CUSTOM = 'PRIVATE_OPERATOR_CUSTOM',
}}

export interface FuelConsumptionTelemetryMetadata {
  readonly recordId: string;
  readonly operatorCode: string;
  readonly fleetVehicleId: string;
  readonly routePermitNumber: string;
  readonly createdEpochMs: number;
  readonly updatedTimestamp: string;
  readonly schemaVersion: string;
  readonly correlationSignature: string;
}}

export interface FuelConsumptionTelemetryConfiguration {
  heartbeatIntervalSec: number;
  geofenceRadiusMeters: number;
  maxPermittedLagMs: number;
  dynamicSurgeMultiplier: number;
  autoRecalibrateThreshold: number;
  strictComplianceLogging: boolean;
  enableTelemetryStreaming: boolean;
  auditRetentionDays: number;
  maxRetryAttempts: number;
  cacheTtlMilliseconds: number;
}}

export interface FuelConsumptionTelemetryGeoCoordinate {
  latitude: number;
  longitude: number;
  altitudeMeters: number;
  speedKmph: number;
  headingDegrees: number;
  accuracyRadiusMeters: number;
  timestamp: number;
}}

export interface FuelConsumptionTelemetryMetricSummary {
  totalTransactions: number;
  cumulativeDistanceKm: number;
  meanProcessingLatencyMs: number;
  successRatePercentage: number;
  activeAlertCount: number;
  peakConcurrency: number;
  systemHealthScore: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_1 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_1 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_1[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_2 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_2 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_2[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_3 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_3 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_3[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_4 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_4 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_4[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_5 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_5 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_5[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_6 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_6 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_6[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_7 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_7 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_7[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_8 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_8 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_8[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_9 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_9 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_9[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_10 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_10 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_10[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_11 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_11 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_11[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_12 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_12 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_12[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_13 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_13 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_13[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_14 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_14 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_14[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_15 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_15 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_15[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_16 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_16 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_16[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_17 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_17 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_17[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_18 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_18 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_18[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_19 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_19 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_19[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}

export interface FuelConsumptionTelemetryEntityRecord_20 {
  entityId: string;
  sequenceIndex: number;
  identifierCode: string;
  categoryTag: 'fuel' | 'telemetry' | 'transit' | 'system';
  operationalState: FuelConsumptionTelemetryStatus;
  priorityLevel: FuelConsumptionTelemetryPriority;
  complianceTier: FuelConsumptionTelemetryRegulatoryTier;
  primaryScalarValue: number;
  varianceIndex: number;
  efficiencyRatio: number;
  thresholdUpperLimit: number;
  isFlaggedForReview: boolean;
  isAutomatedActionApplied: boolean;
  auditTraceTrail: string[];
  telemetryMetadata: FuelConsumptionTelemetryMetadata;
  geoStamp: FuelConsumptionTelemetryGeoCoordinate;
  customAttributes: Record<string, string | number | boolean>;
  eventTimestamps: {
    registeredEpoch: number;
    lastInspectedEpoch: number;
    nextScheduledEvaluation: number;
  };
}}

export interface FuelConsumptionTelemetryBatchOperationResult_20 {
  batchExecutionId: string;
  timestampIso: string;
  totalProcessed: number;
  successCount: number;
  failureCount: number;
  records: FuelConsumptionTelemetryEntityRecord_20[];
  checksumHash: string;
  elapsedProcessingTimeMs: number;
}}
