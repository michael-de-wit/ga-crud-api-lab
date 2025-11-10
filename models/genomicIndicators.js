// models/genomicIndicators.js

const mongoose = require('mongoose');

// ----- MongoDB schema
// ---- Template from: https://fhir.epic.com/Specifications?api=1074
// ---- Schema creation from: https://claude.ai/chat/eb5fbd05-312b-4861-87b0-c23d734a4cbd
const genomicIndicatorsSchema = mongoose.Schema({
  resourceType: {
    type: String,
    default: 'Condition'
  },
  EhrId: {
    type: String,
    required: false
  },
  category: {
    type: [{
      coding: [{
        system: {
          type: String,
          default: "https://open.epic.com/FHIR/StructureDefinition/condition-category"
        },
        code: {
          type: String,
          default: "genomics"
        },
        display: {
          type: String,
          default: "Genomic Indicators"
        }
      }],
      text: {
        type: String,
        default: "Genomic Indicators"
      }
    }],
    default: [{
      coding: [{
        system: "https://open.epic.com/FHIR/StructureDefinition/condition-category",
        code: "genomics",
        display: "Genomic Indicators"
      }],
      text: "Genomic Indicators"
    }]
  },
  code: {
    text: {
      type: String,
      required: false
    }
  },
  subject: {
    reference: {
      type: String,
      required: false
    },
    display: {
      type: String,
      required: false
    }
  },
  recordedDate: {
    type: Date,
    required: false
  },
  evidence: [{
    detail: [{
      reference: {
        type: String
      },
      display: {
        type: String
      }
    }]
  }]
}, {
  timestamps: true
});

const genomicIndicators = mongoose.model('genomicIndicators', genomicIndicatorsSchema);

module.exports = genomicIndicators;